"use client";

import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear any existing errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      // 1. Get CSRF cookie
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      // Debug: log cookies and CSRF token
      console.log("Cookies after csrf-cookie:", document.cookie);
      const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="));
      let xsrfValue = "";
      if (xsrfToken) {
        xsrfValue = decodeURIComponent(xsrfToken.split("=")[1]);
        console.log("XSRF-TOKEN:", xsrfValue);
      } else {
        console.warn("XSRF-TOKEN not found in cookies");
      }
      // 2. Login (set X-XSRF-TOKEN header)
      const res = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": xsrfValue,
          },
          withCredentials: true,
        }
      );
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user.role === "driver") {
        router.push("/dashboard/driver");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left section (form) - exactly 60% width */}
      <div className="w-full md:w-[60%] flex flex-col justify-center p-8 bg-white">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
          <p className="text-base text-center text-gray-600 mb-4">
            Use your account credentials
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaEnvelope className="text-gray-500" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center bg-gray-200 rounded-md">
                <span className="pl-3 pr-2">
                  <FaLock className="text-gray-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-200 py-3 px-2 rounded-md focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="pr-3"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="mb-8">
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-light transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Social Login */}
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7 11v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42s1.95-4.42 4.34-4.42c1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16h-6.61z" />
                  <path d="M21 11h-2v-2h-2v2h-2v2h2v2h2v-2h2z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right section (blue background) - exactly 40% width */}
      <div className="hidden md:flex md:w-[40%] bg-primary-dark text-white flex-col justify-center p-8">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
          <p className="text-sm mb-8">
            Don't have an account yet? Sign up now to access all BusLink
            features.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block border-2 border-white text-white px-10 py-2 rounded-full text-center hover:bg-white hover:text-primary-dark transition-colors"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
