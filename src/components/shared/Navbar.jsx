"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            closeDropdown();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
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
                {isPending ? (
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                ) : user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-200">
                            <div className="w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                {user.image ? (
                                    <img alt={user.name} src={user.image} />
                                ) : (
                                    <span className="font-bold text-[#0A2540]">{user.name?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white rounded-box w-56 border border-gray-200 gap-1">
                            <li className="px-3 py-2 border-b border-gray-200 mb-1 pointer-events-none flex flex-col items-start gap-0.5">
                                <span className="font-bold text-[#0A2540] block w-full truncate text-sm">{user.name}</span>
                                <span className="text-xs text-gray-500 block w-full truncate">{user.email}</span>
                            </li>
                            <li><Link href="/cars" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">Explore Cars</Link></li>
                            <li><Link href="/add-car" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">Add Car</Link></li>
                            <li><Link href="/my-bookings" onClick={closeDropdown} className="text-[#0A2540] hover:text-[#FF6B00]">My Bookings</Link></li>
                            <li className="mt-2 pt-2 border-t border-gray-200">
                                <button onClick={handleLogout} className="btn btn-sm btn-error btn-outline w-full text-left justify-start">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center text-white font-bold px-6 h-10 text-sm shadow-md border-none bg-[#FF6B00] hover:bg-[#E05E00] rounded-xl transition-all duration-300"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;