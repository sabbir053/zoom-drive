import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] bg-gray-50 flex flex-col items-center justify-center px-4 text-center text-gray-800">
      <div className="max-w-md w-full space-y-6">
        
        <div className="relative select-none">
          <h1 className="text-9xl font-black text-[#0A2540]/10 tracking-widest">
            404
          </h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A2540]">
            Oops! Page <span className="text-[#FF6B00]">Not Found</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold px-8 h-11 min-h-0 rounded-xl transition-all duration-300 shadow-md w-full sm:w-auto text-sm"
          >
            Back to Home
          </Link>
          
          <Link
            href="/cars"
            className="btn btn-outline border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:border-[#0A2540] font-bold px-8 h-11 min-h-0 rounded-xl transition-all duration-300 w-full sm:w-auto text-sm"
          >
            Browse Fleet
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;