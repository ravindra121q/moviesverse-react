import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { loginUser } from "../../../services/apiFunctions";
import { ButtonLoader } from "../../common/Loading/LoadingSpinner";

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  GoogleAuthProviderClass as GoogleAuthProvider,
  googleProvider
} from "../../../firebase/firebaseConfig";

const LoginPage = () => {
  const [oauthLoading, setOauthLoading] = useState(false);
  const {setUser}=useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });



  const onSubmit = (data) => {

     loginUser({
      user: {
        email: data.email,
        password: data.password,
      },
       onSuccess: (data) => {
         console.log(data);
         localStorage.setItem("authToken", "loggedIn");
        setUser(data);
        navigate("/movies");
      },
      setIsLoading,
    });
  };

 const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // console.log(result);
      const payload = {
        firstName: result?.user?.displayName?.split(" ")[0],
        lastName: result?.user?.displayName?.split(" ")[1],
        name: result?.user?.displayName,
        countryCode: result?.user?.phoneNumber?.split(" ")[0],
        mobileNumber: result?.user?.phoneNumber?.split(" ")[1] || "1234567890",
        email: result?.user?.email,
        socialId: result?.user?.uid,
        socialType: "Google",
      };
      const token = credential.accessToken;
      localStorage.setItem("authToken", token);
      setUser(payload);
      navigate("/movies");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };


  const disabled = isSubmitting || oauthLoading || isLoading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login to your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
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
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 text-white transition-all hover:bg-indigo-700 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <ButtonLoader color="white" /> Loading...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={disabled}
            className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5 text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-70"
          >
            <Icon icon="flat-color-icons:google" width="22" height="22" />
            {oauthLoading ? "Connecting..." : "Sign in with Google"}
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
