import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900  to-green-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4 border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center text-green-400">ChatApp</h1>
        <h2 className="text-xl text-center font-semibold">Signup</h2>
        <label className="block">
          <span className="text-sm font-medium">Fullname</span>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
            placeholder="Enter full name"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && <p className="text-red-400 text-sm">This field is required</p>}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-400 text-sm">This field is required</p>}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-red-400 text-sm">This field is required</p>}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Confirm Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
            placeholder="Confirm password"
            {...register("confirmPassword", { required: true, validate: validatePasswordMatch })}
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}
        </label>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Have an account?
            <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login</Link>
          </p>
          <input
            type="submit"
            value="Signup"
            className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer text-white font-bold hover:bg-green-600"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
