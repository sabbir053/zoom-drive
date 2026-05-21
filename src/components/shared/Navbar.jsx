"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    // অথেন্টিকেশন স্টেট (আপনার প্রজেক্টের রিয়েল কন্টেক্সট বা ইউজার স্টেট এখানে বসবে)
    const user = {
        name: "Mohammad Sabbir Hosen",
        email: "sabbir@example.com",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    };

    const handleLogout = () => {
        console.log("Logged out");
        closeDropdown();
    };

    const closeDropdown = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const navLinks = (
        <>
            <li>
                <Link href="/" onClick={closeDropdown} className={pathname === '/' ? 'text-[#FF6B00] font-bold bg-transparent' : 'text-[#0A2540] hover:text-[#FF6B00] transition-colors'}>
                    Home
                </Link>
            </li>
            <li>
                <Link href="/cars" onClick={closeDropdown} className={pathname === '/cars' ? 'text-[#FF6B00] font-bold bg-transparent' : 'text-[#0A2540] hover:text-[#FF6B00] transition-colors'}>
                    Explore Cars
                </Link>
            </li>
            {user && (
                <>
                    <li>
                        <Link href="/add-car" onClick={closeDropdown} className={pathname === '/add-car' ? 'text-[#FF6B00] font-bold bg-transparent' : 'text-[#0A2540] hover:text-[#FF6B00] transition-colors'}>
                            Add Car
                        </Link>
                    </li>
                    <li>
                        <Link href="/my-bookings" onClick={closeDropdown} className={pathname === '/my-bookings' ? 'text-[#FF6B00] font-bold bg-transparent' : 'text-[#0A2540] hover:text-[#FF6B00] transition-colors'}>
                            My Bookings
                        </Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-white/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-gray-200 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#0A2540]" aria-label="Open Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 gap-1 border border-gray-200">
                        {navLinks}
                    </ul>
                </div>

                {/* লোগো টেক্সট */}
                <Link href="/" className="btn btn-ghost text-xl font-black tracking-tight p-0 md:p-2">
                    <span className="text-[#0A2540]">Zoom</span><span className="text-[#FF6B00]">Drive</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-200">
                            <div className="w-10 rounded-full">
                                <img alt={user.name} src={user.photoURL} />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white rounded-box w-56 border border-gray-200 gap-1">
                            {/* রেসপনসিভ ইউজার প্রোফাইল ইনফো সেকশন */}
                            <li className="px-3 py-2 border-b border-gray-200 mb-1 pointer-events-none flex flex-col items-start gap-0.5">
                                <span className="font-bold text-[#0A2540] block w-full truncate text-sm">{user.name}</span>
                                <span className="text-xs text-gray-500 block w-full truncate">{user.email}</span>
                            </li>
                            <li><Link href="/add-car" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">Add Car</Link></li>
                            <li><Link href="/my-bookings" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">My Bookings</Link></li>
                            <li><Link href="/my-added-cars" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">My Added Cars</Link></li>
                            <li className="mt-2 pt-2 border-t border-gray-200">
                                <button onClick={handleLogout} className="btn btn-sm btn-error btn-outline w-full text-left justify-start">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/login" className="btn text-white btn-sm md:btn-md font-bold px-6 shadow-md border-none bg-[#FF6B00] hover:bg-[#E05E00]">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;