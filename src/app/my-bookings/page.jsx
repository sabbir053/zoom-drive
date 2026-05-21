"use client";
import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiOutlineEye, HiOutlineCalendar, HiMiniFunnel } from "react-icons/hi2";
import { FaRegMoneyBill1 } from "react-icons/fa6";

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [processingDelete, setProcessingDelete] = useState(false);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, []);

    const handleCancelClick = (id) => {
        setSelectedBookingId(id);
        setDeleteModalOpen(true);
    };

    const confirmCancelBooking = async () => {
        if (!selectedBookingId) return;
        setProcessingDelete(true);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBookingId}`, {
                method: 'DELETE',
            });
            
            if (res.ok) {
                setBookings(prev => prev.filter(booking => booking._id !== selectedBookingId));
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        } finally {
            setProcessingDelete(false);
            setDeleteModalOpen(false);
            setSelectedBookingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
            </div>
        );
    }

    const totalSpend = bookings.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
    const activeTrips = bookings.filter(item => item.status !== 'Completed' && item.status !== 'Cancelled').length;

    return (
        <div className="min-h-screen bg-gray-50 py-12 text-gray-800 font-sans">
            <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0A2540] tracking-tight">
                            My <span className="text-[#FF6B00]">Bookings</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Track your active rentals, view invoices, and manage your upcoming trips.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[130px] shadow-sm">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Spend</p>
                            <p className="text-xl font-black text-[#0A2540] mt-1">৳{totalSpend}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[130px] shadow-sm">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Trips</p>
                            <p className="text-xl font-black text-[#FF6B00] mt-1">{activeTrips}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-3">
                    <div className="flex items-center text-gray-500 gap-1.5 text-sm font-bold">
                        <HiMiniFunnel size={16} /> Filter Status:
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 py-2 pl-3 pr-10 focus:outline-none shadow-sm focus:border-[#FF6B00]"
                            onChange={(e) => {
                            }}
                        >
                            <option value="all">All Bookings</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {bookings.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p className="text-lg font-bold text-[#0A2540]">No bookings found!</p>
                            <p className="text-sm text-gray-400 mt-1">You haven&apos;t rented any vehicles yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#0A2540] text-white uppercase text-xs font-bold tracking-wider">
                                        <th className="py-4 px-6">Vehicle Details</th>
                                        <th className="py-4 px-6">
                                            <span className="flex items-center gap-1.5">
                                                <HiOutlineCalendar size={16} /> Booking Date
                                            </span>
                                        </th>
                                        <th className="py-4 px-6">
                                            <span className="flex items-center gap-1.5">
                                                <FaRegMoneyBill1 size={16} /> Total Cost
                                            </span>
                                        </th>
                                        <th className="py-4 px-6">Driver Requirement</th>
                                        <th className="py-4 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                                    {bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={booking.carImage || "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=150"}
                                                        alt={booking.carName}
                                                        className="w-14 h-10 object-cover rounded-lg bg-gray-100 ring-1 ring-gray-200"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-base">{booking.carName}</p>
                                                        <p className="text-xs text-gray-400 font-semibold">{booking.carType || 'Standard'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 font-bold">
                                                        {booking.bookingDate || new Date().toLocaleDateString()}
                                                    </span>
                                                    <span className="text-xs text-[#FF6B00] font-black mt-0.5">Active Track</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black text-[#0A2540]">৳{booking.totalPrice}</span>
                                                    <span className="text-xs text-gray-400 font-normal">Paid Via Account</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    booking.driverNeeded === 'Yes' 
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}>
                                                    {booking.driverNeeded === 'Yes' ? 'Driver Needed' : 'Self Drive'}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleCancelClick(booking._id)}
                                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" 
                                                        title="Cancel Booking"
                                                    >
                                                        <HiOutlineTrash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-gray-100 space-y-4 text-center">
                        <div>
                            <h3 className="text-lg font-bold text-[#0A2540]">Cancel Booking?</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                Are you sure you want to cancel this vehicle booking? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                disabled={processingDelete}
                                onClick={() => setDeleteModalOpen(false)}
                                className="btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold border-none h-11 min-h-0 rounded-xl"
                            >
                                No, Keep
                            </button>
                            <button
                                type="button"
                                disabled={processingDelete}
                                onClick={confirmCancelBooking}
                                className="btn flex-1 bg-red-600 hover:bg-red-700 text-white font-bold border-none h-11 min-h-0 rounded-xl shadow-sm"
                            >
                                {processingDelete ? 'Cancelling...' : 'Yes, Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;