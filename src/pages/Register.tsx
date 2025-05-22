import Card from "../components/Card";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/userSchemas";
import Button from "../components/Button";
import type { RegisterSchema } from "../schemas/userSchemas";
import ErrorInput from "../components/ErrorInput";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen container mx-auto flex items-center justify-center p-4 sm:p-6">
      <Card>
        <h1 className="text-4xl font-bold text-gray-600 p-2">Register</h1>
        <p className="text-gray-600 px-2 py-4">
          If you already have an account, you can go back to{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            login
          </a>
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Name" register={register("name")} />
          {errors.name && (
            <ErrorInput errors={errors.name?.message as string} />
          )}
          <Input type="text" placeholder="Phone" register={register("phone")} />
          {errors.phone && (
            <ErrorInput errors={errors.phone?.message as string} />
          )}
          <Select
            options={["Select your gender", "male", "female", "other"]}
            register={register("gender")}
          />
          {errors.gender && (
            <ErrorInput errors={errors.gender?.message as string} />
          )}
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
          <Checkbox
            label="Do you want to receive news?"
            register={register("receiveNews")}
          />
          {errors.receiveNews && (
            <ErrorInput errors={errors.receiveNews?.message as string} />
          )}
          <Button type="submit" className="mt-6">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
