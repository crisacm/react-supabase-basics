import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../schemas/userSchemas";
import type { ChangePasswordSchema } from "../schemas/userSchemas";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <h1 className="text-4xl font-bold text-gray-600 p-2">
          Change password
        </h1>
        <p className="text-gray-600 px-2 py-4">
          Go ahead, and I hope this time it's one you can easily remember.
        </p>
        <p className="text-gray-600 px-2">
          If you have already changed your password and wish to log in, you can
          do it from here by returning to the{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            login
          </a>
          .
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-gray-600 px-2">Please enter your new password</p>
          <Input
            type="password"
            placeholder="Password"
            register={register("password")}
          />
          {errors.password && (
            <ErrorInput errors={errors.password?.message as string} />
          )}
          <Button type="submit" className="mt-6">
            Change password
          </Button>
        </form>
      </Card>
    </div>
  );
}
