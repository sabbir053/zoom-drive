"use client";
import React from 'react';
import Link from 'next/link';

export default function PromoCTA() {
  return (
    <section className="py-16 md:py-20 bg-[#0A2540] relative overflow-hidden">
      
      {/* Background Subtle Overlays */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-6">
        
        {/* Promotional Badge */}
        <span className="inline-block bg-[#FF6B00] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-md shadow-md">
          Special Summer Offer
        </span>

        {/* Big Bold Catchy Headline */}
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Save Up To <span className="text-[#FF6B00]">15%</span> On Your First <br className="hidden md:inline" />
          Premium Rental This Week!
        </h2>

        {/* Supporting Text */}
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Whether you are planning a weekend road trip, a business meeting, or a family vacation, our certified cars are ready to hit the road. No hidden fees, secure payment, and immediate booking approval.
        </p>

        {/* Quick Features List */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs md:text-sm text-slate-200 font-medium pt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B00]">✓</span> Free Cancellation
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B00]">✓</span> 24/7 Roadside Assistance
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B00]">✓</span> Clean & Sanitized Cars
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/cars" 
            className="btn text-white font-bold px-10 border-none bg-[#FF6B00] hover:bg-[#E05E00] shadow-lg shadow-[#FF6B00]/30 transition-all duration-300 transform hover:scale-105"
          >
            Find Your Car Now ➔
          </Link>
        </div>

      </div>
    </section>
  );
}