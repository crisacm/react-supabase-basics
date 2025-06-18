import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import type { AuthError } from "@supabase/supabase-js";
import { useAuth } from "../context/AuthContext";

export const useAuthActions = () => {
  const { setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw (error as AuthError).message;
      setSession(data.session);
      return { success: true };
    } catch (error) {
      setError(error as string);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw (error as AuthError).message;
      setSession(null);
      return { success: true };
    } catch (error) {
      setError(error as string);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      name: string,
      phone: string,
      email: string,
      password: string,
      receiveNews: boolean
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              phone,
              receiveNews,
            },
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
          },
        });
        if (error) throw (error as AuthError).message;
        return {
          success: true,
          user: data.user,
          session: data.session,
        };
      } catch (error) {
        setError(error as string);
        return { success: false };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resendVerificationEmail = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resend({
        email,
        type: "signup",
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (error) throw (error as AuthError).message;
      return { success: true };
    } catch (error) {
      setError(error as string);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/change-password`,
      });

      if (error) throw (error as AuthError).message;
      return { success: true };
    } catch (error) {
      setError(error as string);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw (error as AuthError).message;
      return { success: true };
    } catch (error) {
      setError(error as string);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshSession = useCallback(
    async (accessToken: string, refreshToken: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) throw (error as AuthError).message;
        return { success: true };
      } catch (error) {
        setError(error as string);
        return { success: false };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    login,
    logout,
    register,
    resendVerificationEmail,
    requestPasswordReset,
    updatePassword,
    refreshSession,
  };
};

export default useAuthActions;
