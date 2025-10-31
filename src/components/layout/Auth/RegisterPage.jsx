import { useState } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "../../../services/apiFunctions";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    console.log(data);
    addUser({ user: data, setIsLoading, onSuccess:()=>navigate("/") });

  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              className={`mt-1 w-full rounded-lg border px-4 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`mt-1 w-full rounded-lg border px-4 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`mt-1 w-full rounded-lg border px-4 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`mt-1 w-full rounded-lg border px-4 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white transition-all hover:bg-indigo-700 disabled:opacity-70"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
