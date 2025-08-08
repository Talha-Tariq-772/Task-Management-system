"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// import RegisterForm from "@/components/auth/registerForm/registerForm";
import { useUserContext } from "@/context/userContext";
import Register from "../components/auth/registerForm/registerForm";

export default function RegisterPage() {
  const { user } = useUserContext();
  const router = useRouter();

  // If already logged in, send home
  useEffect(() => {
    if (user && user._id) {
      router.replace("/");
    }
  }, [user, router]);

  // Avoid flashing the form
  if (user && user._id) return null;

  return (
    <div className="auth-page flex items-center justify-center h-screen bg-gray-50">
      <div>
        <Register />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            className="cursor-pointer font-semibold text-blue-600 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
