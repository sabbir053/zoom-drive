"use client";
import React from 'react';

const featuresData = [
  {
    id: 1,
    icon: "💰",
    title: "Affordable Rates",
    description: "No hidden charges or surprise fees. What you see is exactly what you pay, with premium quality guaranteed."
  },
  {
    id: 2,
    icon: "⚡",
    title: "Easy & Fast Booking",
    description: "Book your favorite luxury or budget car in less than 2 minutes with our streamlined online system."
  },
  {
    id: 3,
    icon: "🛡️",
    title: "Fully Insured Cars",
    description: "Drive with absolute peace of mind. Every single vehicle in our fleet is 100% verified and fully insured."
  },
  {
    id: 4,
    icon: "🛠️",
    title: "24/7 Roadside Support",
    description: "Our dedicated support team and mechanics are always on standby to assist you anywhere, anytime."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Text and Badges */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-xs md:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Why Choose Us
            </span>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] leading-tight">
              We Provide The Best <br />
              Car Rental Experience <br />
              For Our Customers
            </h2>
            
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              DriveFleet is dedicated to making your road trips, business commutes, and weekend getaways smooth and reliable. We focus on premium safety standards and customer satisfaction above all.
            </p>
            
            {/* Simple Trust Counter Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-black text-[#FF6B00]">50+</p>
                <p className="text-xs font-semibold text-gray-400 uppercase">Premium Cars</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-black text-[#0A2540]">10k+</p>
                <p className="text-xs font-semibold text-gray-400 uppercase">Happy Trips</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-black text-[#0A2540]">4.9★</p>
                <p className="text-xs font-semibold text-gray-400 uppercase">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side: Features Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {featuresData.map((feature) => (
              <div 
                key={feature.id}
                className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FF6B00]/20 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                {/* Feature Icon Wrapper */}
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-bold text-[#0A2540] mb-2 group-hover:text-[#FF6B00] transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}