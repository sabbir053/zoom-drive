"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-slate-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-black tracking-tight text-white">
              Drive<span className="text-[#FF6B00]">Fleet</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              আপনার নিরাপদ এবং আরামদায়ক ভ্রমণের বিশ্বস্ত সঙ্গী। আধুনিক ও প্রিমিয়াম ক্যাটাগরির গাড়ি সাশ্রয়ী মূল্যে রেন্ট করুন যেকোনো সময়।
            </p>
          </div>

          {/* Column 2: Useful Links (অরেঞ্জ হোভার ও বর্ডার) */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-l-2 border-[#FF6B00] pl-2">Useful Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[#FF6B00] transition-colors text-slate-400 hover:underline">Home</Link></li>
              <li><Link href="/cars" className="hover:text-[#FF6B00] transition-colors text-slate-400 hover:underline">Explore Cars</Link></li>
              <li><Link href="/add-car" className="hover:text-[#FF6B00] transition-colors text-slate-400 hover:underline">List Your Car</Link></li>
              <li><Link href="/terms" className="hover:text-[#FF6B00] transition-colors text-slate-400 hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info (অরেঞ্জ আইকন) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-l-2 border-[#FF6B00] pl-2">Contact Info</h4>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>গুলশান-২, ঢাকা, বাংলাদেশ</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>support@drivefleet.com</span>
            </div>
          </div>

          {/* Column 4: Social (সার্কেল ব্যাকগ্রাউন্ড ও অরেঞ্জ হোভার) */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-l-2 border-[#FF6B00] pl-2">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle bg-white/10 border-none text-white hover:bg-[#FF6B00] transition-all duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle bg-white/10 border-none text-white hover:bg-[#FF6B00] transition-all duration-200">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} DriveFleet. All rights reserved.</p>
          <p>
            Designed with <span className="text-[#FF6B00] font-semibold">Orange</span> & <span className="text-white font-semibold">Blue</span>
          </p>
        </div>
      </div>
    </footer>
  );
}