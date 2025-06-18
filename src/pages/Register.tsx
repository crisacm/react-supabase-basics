import Card from "../components/Card";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/userSchemas";
import Button from "../components/Button";
import type { RegisterSchema } from "../schemas/userSchemas";
import ErrorInput from "../components/ErrorInput";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router";
import { useAuthActions } from "../hooks/useAuthActions";
import { useToast } from "../components/ToastProvider";
import { useEffect } from "react";

/**
 * Register page.
 *
 * This page allows the user to register a new account. It contains a form with
 * three fields: name, email, and password. If the user enters the correct
 * information, the user is redirected to the login page. If the user enters
 * the wrong information, an error message is displayed.
 */
export default function Register() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthActions();
  const { showToast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      const { success } = await register(
        data.name,
        data.phone,
        data.email,
        data.password,
        data.termsAndConditions
      );
      if (success) {
        navigate("/register/success", {
          state: { email: data.email },
        });
      }
    } catch (error) {
      showToast(error as string, "error");
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <Card.Body>
          <h1 className="text-4xl font-bold text-gray-600 p-2">Sign In</h1>
          <p className="text-gray-600 px-2 py-4">
            If you already have an account, you can go back to{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              login
            </a>
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Name"
              register={registerForm("name")}
            />
            {errors.name && (
              <ErrorInput errors={errors.name?.message as string} />
            )}
            <Input
              type="text"
              placeholder="Phone"
              register={registerForm("phone")}
            />
            {errors.phone && (
              <ErrorInput errors={errors.phone?.message as string} />
            )}
            <Input
              type="text"
              placeholder="Email"
              register={registerForm("email")}
            />
            {errors.email && (
              <ErrorInput errors={errors.email?.message as string} />
            )}
            <Input
              type="password"
              placeholder="Password"
              register={registerForm("password")}
            />
            {errors.password && (
              <ErrorInput errors={errors.password?.message as string} />
            )}
            <Checkbox
              label="I accept the terms and conditions"
              register={registerForm("termsAndConditions")}
            />
            {errors.termsAndConditions && (
              <ErrorInput
                errors={errors.termsAndConditions?.message as string}
              />
            )}
            <Button type="submit" className="mt-6" loading={isLoading}>
              Register
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
