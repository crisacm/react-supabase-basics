import { loginSchema } from "../schemas/userSchemas";
import type { LoginSchema } from "../schemas/userSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonBorderless from "../components/ButtonBorderless";
import Card from "../components/Card";
import ErrorInput from "../components/ErrorInput";
import { useAuthActions } from "../hooks/useAuthActions";
import { useToast } from "../components/ToastProvider";
import { useEffect } from "react";
import googleLogo from "../assets/Google.svg";
import facebookLogo from "../assets/Facebook.svg";
import appleLogo from "../assets/Apple.svg";

/**
 * Login page.
 *
 * This page allows the user to log in to the application. It contains a form
 * with two fields: email and password. If the user enters the correct email
 * and password, the user is redirected to the home page. If the user enters
 * the wrong email or password, an error message is displayed.
 *
 * The page also contains a link to the registration page, in case the user
 * does not have an account yet.
 *
 * @returns The login page.
 */
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login, isLoading, error } = useAuthActions();

  const onSubmit = async (data: any) => {
    try {
      const { success } = await login(data.email, data.password);
      if (success) navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  const onExternalLogin = () => {
    showToast("External login not implemented yet", "warning");
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <Card.Body>
          <h1 className="text-4xl font-bold text-gray-600 p-2 text-center">
            Welcome back!
          </h1>
          <p className="text-gray-600 px-2 py-4 text-center">
            Hey, Enter your details to get sign in to your account
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
            <Input
              type="password"
              placeholder="Password"
              register={register("password")}
            />
            {errors.password && (
              <ErrorInput errors={errors.password?.message as string} />
            )}
            <a
              href="/request-change-password"
              className="text-blue-800 font-semibold px-2 flex justify-end"
            >
              Forgot your password?
            </a>
            <Button type="submit" className="mt-6" loading={isLoading}>
              Login
            </Button>
            <p className="text-gray-600 px-2 text-center py-2">
              Or sign in with
            </p>
            <div className="flex justify-center gap-4 pb-6">
              <ButtonBorderless onClick={onExternalLogin} type="button">
                <div className="flex items-center gap-2 group">
                  <img src={googleLogo} alt="Google" className="w-5 h-5" />
                  Google
                </div>
              </ButtonBorderless>
              <ButtonBorderless onClick={onExternalLogin} type="button">
                <div className="flex items-center gap-2 group">
                  <img src={facebookLogo} alt="Facebook" className="w-5 h-5" />
                  Facebook
                </div>
              </ButtonBorderless>
              <ButtonBorderless onClick={onExternalLogin} type="button">
                <div className="flex items-center gap-2 group">
                  <img src={appleLogo} alt="Apple" className="w-5 h-5" />
                  Apple
                </div>
              </ButtonBorderless>
            </div>
            <p className="text-gray-600 px-2">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-800 font-semibold px-2">
                Register here
              </a>
            </p>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
