import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../schemas/userSchemas";
import type { LoginSchema } from "../schemas/userSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import ErrorInput from "../components/ErrorInput";

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

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    try {
      login(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <h1 className="text-4xl font-bold text-gray-600 p-2">Log in</h1>
        <p className="text-gray-600 px-2 py-4">
          Welcome, if you do not have a user you can register one in the{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            following link
          </a>
          .
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Email" register={register("email")} />
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
          <p className="text-gray-600 px-2">
            Forgot your password? Don't worry, you can request a change here{" "}
            <a
              href="/request-change-password"
              className="text-blue-600 font-semibold"
            >
              here
            </a>
            .
          </p>
          <Button type="submit" className="mt-6">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
