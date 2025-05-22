import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordResetSchema } from "../schemas/userSchemas";
import type { RequestPasswordResetSchema } from "../schemas/userSchemas";
import ErrorInput from "../components/ErrorInput";

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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <h1 className="text-4xl font-bold text-gray-600 p-2">
          Request change password
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
          <Input type="text" placeholder="Email" register={register("email")} />
          {errors.email && (
            <ErrorInput errors={errors.email?.message as string} />
          )}
          <Button type="submit" className="mt-6">
            Request change password
          </Button>
        </form>
      </Card>
    </div>
  );
}
