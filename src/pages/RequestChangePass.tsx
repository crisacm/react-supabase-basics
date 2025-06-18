import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordResetSchema } from "../schemas/userSchemas";
import type { RequestPasswordResetSchema } from "../schemas/userSchemas";
import ErrorInput from "../components/ErrorInput";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthActions from "../hooks/useAuthActions";
import { useToast } from "../components/ToastProvider";
import { useEffect } from "react";

/**
 * Request change password page.
 *
 * This page allows the user to request a change password. It contains a form
 * with one field: email. If the user enters the correct email, the user is
 * redirected to the change password page. If the user enters the wrong email,
 * an error message is displayed.
 *
 * @returns The request change password page.
 */
export default function RequestChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordResetSchema>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { requestPasswordReset, isLoading, error } = useAuthActions();

  const onSubmit = async (data: any) => {
    try {
      const { success } = await requestPasswordReset(data.email);
      if (success)
        navigate("/request-change-password/success", {
          state: {
            email: data.email,
          },
        });
    } catch (error) {
      showToast(error as string, "error");
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  useEffect(() => {
    const params = location.state;
    const error = params?.error;

    if (error) {
      showToast(error, "error");
      return;
    }
  }, [location]);

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <Card.Body>
          <h1 className="text-4xl font-bold text-gray-600 p-2">
            Change password
          </h1>
          <p className="text-gray-600 px-2 py-4">
            Don't worry, sometimes we tend to forget things, but if you remember
            the password again, you can go back to the{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              login
            </a>
            .
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Email"
              register={register("email")}
            />
            {errors.email && (
              <ErrorInput errors={errors.email?.message as string} />
            )}
            <Button type="submit" className="mt-6" loading={isLoading}>
              Request a change password
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
