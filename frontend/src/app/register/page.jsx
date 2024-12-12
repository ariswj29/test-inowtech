"use client";

import { registerField } from "../../services/auth";
import { ShowMessage } from "../../components/ShowMessage";
import { registerSchema } from "../../utils/register-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter();

  const [dataMessage, setDataMessage] = useState({
    message: "",
    status: "",
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSubmit = async (formData) => {
    try {
      console.log(formData, "formData");
      const response = await registerField({ ...formData });

      const { status, message } = response;

      setDataMessage(response);

      if (status === "success") {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);

          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="p-12 max-w-screen-xl mx-auto items-center">
      {showMessage && (
        <ShowMessage
          name={
            dataMessage.status === "success"
              ? "Register Success"
              : "Register Failed"
          }
          desc={dataMessage.message}
          status={dataMessage.status}
          show={showMessage}
        />
      )}
      <div className="grid md:grid-cols-3 sm:grid-cols-1">
        <div className="p-12 sm:p-16 bg-black text-white border border-secondary shadow-sm w-full">
          <h3 className="text-2xl font-bold ">Welcome to Register</h3>
          <p className="my-2">
            Register your account and access for the features
          </p>
        </div>
        <div className="col-span-2 bg-primary shadow-md w-full">
          <form onSubmit={handleSubmit(formSubmit)} className="p-8">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register("username")}
                type="text"
                id="username"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-xs text-red-500 m-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-xs text-red-500 m-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between">
                <input
                  className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                  {...register("password")}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                />
                <span
                  className="absolute right-3 mt-1 top-1/2 cursor-pointer transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 m-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Password Confirmation<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between">
                <input
                  className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                  {...register("confirmPassword")}
                  placeholder="Password Confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                />
                <span
                  className="absolute right-3 mt-1 top-1/2 cursor-pointer transform"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 m-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3 bg-black text-white rounded-md hover:font-bold"
            >
              Register
            </button>
            <hr className="my-4" />
            <Link
              href="/login"
              className="block w-full text-center py-2 px-3 border border-secondary rounded-md hover:font-bold"
            >
              Have an account? Login here
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
