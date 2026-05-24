"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {

  const onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    
    const {data, error} = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      image: userData.image,
      password: userData.password
    })

    console.log(data, error);

    if(data) {
      redirect("/login");
    }
    if(error) {
      alert(error.message || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-gray-800">
      <div className="sm:mx-auto w-full max-w-md">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-[#0A2540]">
            Create an <span className="text-[#FF6B00]">Account</span>
          </h2>
          <p className="text-sm text-gray-500">
            Join ZoomDrive to access premium vehicle rentals
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
            <form className="space-y-5" onSubmit={onsubmit}>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 text-sm">Full Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4 border-gray-200"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 text-sm">Email Address</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4 border-gray-200"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 text-sm">Image</span>
                </label>
                <input
                  name="image"
                  type="text"
                  placeholder="your image url"
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4 border-gray-200"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 text-sm">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4 border-gray-200"
                />
              </div>


              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center btn bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold h-11 min-h-0 rounded-xl shadow-md transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-[#0A2540] hover:text-[#FF6B00] transition-colors">
                  Sign In here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;