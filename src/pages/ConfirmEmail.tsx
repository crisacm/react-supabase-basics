import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router";

/**
 * Confirm email page.
 *
 * This page is displayed after the user has successfully registered a new
 * account. It contains a message with the email address that was used to
 * register the account and a link to the login page.
 */
export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const verifyEmail = async () => {
      if (
        searchParams.get("type") === "signup" &&
        searchParams.get("token_hash")
      ) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: searchParams.get("token_hash") as string,
            type: "signup",
          });

          if (error) {
            console.error("Error al verificar el correo:", error);
            setStatus("error");
            return;
          }

          setStatus("success");

          setTimeout(() => {
            navigate("/login", {
              state: {
                message: "Your email has been verified successfully.",
              },
            });
          }, 3000);
        } catch (error) {
          console.error("Error al verificar el correo:", error);
          setStatus("error");
        }
      } else {
        navigate("/login");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {status === "verifying" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700">
              Verificando tu correo electrónico...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              ¡Correo verificado con éxito!
            </h2>
            <p className="text-gray-600">
              Tu cuenta ha sido verificada correctamente.
            </p>
            <p className="text-sm text-gray-500">
              Redirigiendo al inicio de sesión...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Error en la verificación
            </h2>
            <p className="text-gray-600">
              No se pudo verificar tu correo. El enlace puede haber expirado o
              ser inválido.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Volver al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
