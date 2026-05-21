"use client";
import React from 'react';
import Link from 'next/link';
import carimg from '../../public/view-3d-car.jpg';
import Image from 'next/image';
export default function Banner() {
  return (
    <div className="relative min-h-[80vh] lg:min-h-[85vh] bg-[#0A2540] flex items-center overflow-hidden">

      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
        <div className="absolute transform rotate-45 bg-[#FF6B00] w-[500px] h-[500px] -top-20 -right-20 rounded-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-12 lg:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-xs md:text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-[#FF6B00]/20">
              Premium Car Rental Service
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Looking for a <br />
              Car Rental? <span className="text-[#FF6B00]">DriveFleet</span> <br />
              Is Your Best Choice
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the ultimate comfort and freedom with our premium fleet. Rent standard, luxury, or family cars at unbeatable daily rates with 24/7 customer support and fully verified vehicles.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/cars" className="btn text-white font-bold px-8 border-none bg-[#FF6B00] hover:bg-[#E05E00] shadow-lg shadow-[#FF6B00]/20 transition-all duration-300">
                Explore Cars
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center items-center">
            <div className="relative w-full max-w-xl lg:max-w-none aspect-[16/10] md:aspect-[16/9] lg:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00]/20 to-transparent rounded-2xl blur-2xl"></div>

              <Image
                src={carimg}
                alt="Premium Rental Car"
                height={650}
                width={650}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-transform duration-500"
              />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}