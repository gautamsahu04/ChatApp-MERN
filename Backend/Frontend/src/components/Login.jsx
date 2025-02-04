import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
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
    <div className="flex h-screen items-center justify-center  bg-gradient-to-br from-blue-900  to-green-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800  shadow-xl px-8 py-6 rounded-lg space-y-5 w-96"
      >
        <h1 className="text-3xl font-bold text-center text-green-600">
          Chat<span className="text-green-600">App</span>
        </h1>
        <h2 className="text-xl text-white font-semibold text-center">Login</h2>

        {/* Email */}
        <div>
          <label className="block text-white font-medium">Email</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-white font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
        </div>

        {/* Text & Button */}
        <div className="flex justify-between items-center">
          <p className="text-white">
            New user?
            <Link to="/signup" className="text-blue-600 font-semibold ml-1">
              Signup
            </Link>
          </p>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
