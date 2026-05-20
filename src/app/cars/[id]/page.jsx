"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// ডামি ডাটাবেজ অবজেক্ট (আইডি ম্যাচিং টেস্ট করার জন্য)
const mockCarsData = [
    {
        _id: "car_01",
        carModel: "Tesla Model 3",
        carType: "Electric / Luxury",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
        pricePerDay: 85,
        transmission: "Automatic",
        fuelType: "Electric",
        seatingCapacity: 5,
        engine: "Dual Motor AWD",
        color: "Pearl White",
        description: "Experience the future of driving with the Tesla Model 3. Equipped with a high-performance dual-motor AWD system, luxurious minimalist interior, and advanced safety autopilot assistance. Perfect for business travels or experiencing an elite electric ride.",
        features: ["Autopilot", "15-inch Touchscreen", "Premium Audio", "Heated Seats", "Panoramic Glass Roof"]
    }
];

export default function CarDetailsPage({ params }) {
    // ডাইনামিক আইডি ইউআরএল থেকে নেওয়া হচ্ছে (params.id)
    const carId = params?.id || "car_01";

    // আইডি দিয়ে নির্দিষ্ট কার ডাটাবেজ থেকে খুঁজে নেওয়া (ভবিষ্যতে এখানে fetch/axios বসবে)
    const car = mockCarsData.find(c => c._id === carId) || mockCarsData[0];

    // বুকিং ফর্মের স্টেট ম্যানেজমেন্ট
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // বুকিং হ্যান্ডলার
    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = {
            carId: car._id,
            carModel: car.carModel,
            startDate,
            endDate,
            totalCost: calculateTotalCost()
        };
        alert(`Booking Request Submitted!\nVehicle: ${bookingDetails.carModel}\nTotal Cost: $${bookingDetails.totalCost}`);
    };

    // দিন হিসাব করে টোটাল ভাড়া বের করার সিম্পল লজিক
    const calculateTotalCost = () => {
        if (!startDate || !endDate) return car.pricePerDay;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        return diffDays * car.pricePerDay;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 md:py-20 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Back Link Breadcrumb */}
                <div className="mb-8">
                    <Link href="/cars" className="text-sm font-semibold text-[#FF6B00] hover:underline flex items-center gap-2">
                        ← Back to Available Cars
                    </Link>
                </div>

                {/* Main 2-Column Split Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Car Specs, Large Image & Description (7 Columns) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Header Text Block */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-md">
                                {car.carType}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-[#0A2540]">{car.carModel}</h1>
                            <p className="text-sm text-gray-400 font-medium">Car ID Reference: <span className="text-gray-600 font-mono">{car._id}</span></p>
                        </div>

                        {/* Large Hero Image Layout */}
                        <div className="w-full aspect-[16/10] bg-gray-200 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                            <img
                                src={car.image}
                                alt={car.carModel}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Key Specs Row Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center shadow-sm">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Transmission</p>
                                <p className="text-sm font-black text-[#0A2540] mt-1">{car.transmission}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center shadow-sm">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Fuel Type</p>
                                <p className="text-sm font-black text-[#0A2540] mt-1">{car.fuelType}</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center shadow-sm">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Capacity</p>
                                <p className="text-sm font-black text-[#0A2540] mt-1">{car.seatingCapacity} Seats</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center shadow-sm">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Exterior Color</p>
                                <p className="text-sm font-black text-[#0A2540] mt-1">{car.color}</p>
                            </div>
                        </div>

                        {/* About / Description Block */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-[#0A2540] border-b pb-2 border-gray-200">Vehicle Description</h3>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{car.description}</p>
                        </div>

                        {/* Premium Features List */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-[#0A2540]">Premium Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {car.features.map((feature, idx) => (
                                    <span key={idx} className="bg-gray-200/60 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-300/40">
                                        ✦ {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Dynamic Booking Form Card (5 Columns) */}
                    <div className="lg:col-span-5 w-full sticky top-8">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">

                            {/* Pricing Display */}
                            <div className="flex items-baseline justify-between border-b pb-4 border-gray-100">
                                <span className="text-sm font-bold text-gray-500">Rental Price</span>
                                <div>
                                    <span className="text-3xl font-black text-[#FF6B00]">${car.pricePerDay}</span>
                                    <span className="text-gray-400 text-xs font-bold"> / Day</span>
                                </div>
                            </div>

                            {/* Booking Inputs Form */}
                            <form className="space-y-4" onSubmit={handleBookingSubmit}>

                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-gray-600 text-xs">Pick-up Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="input input-bordered w-full focus:outline-none focus:border-[#FF6B00] text-sm"
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-gray-600 text-xs">Drop-off Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="input input-bordered w-full focus:outline-none focus:border-[#FF6B00] text-sm"
                                    />
                                </div>

                                {/* Real-time Dynamic Invoice Cost Calculator */}
                                {startDate && endDate && (
                                    <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-dashed border-gray-200">
                                        <div className="flex justify-between text-xs text-gray-500 font-medium">
                                            <span>Daily Base Rate:</span>
                                            <span>${car.pricePerDay}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 font-medium">
                                            <span>Estimated Days:</span>
                                            <span>{Math.ceil(Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1} Days</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold text-[#0A2540] pt-2 border-t border-gray-200">
                                            <span>Estimated Total:</span>
                                            <span className="text-[#FF6B00]">${calculateTotalCost()}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Instant Book Action button */}
                                <button
                                    type="submit"
                                    className="btn w-full text-white font-bold border-none pt-1 bg-[#0A2540] hover:bg-[#FF6B00] shadow-md transition-all duration-300"
                                >
                                    Confirm Rental Booking 🏎️
                                </button>
                            </form>

                            {/* Extra Safety Notice Widget */}
                            <div className="text-center bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                                <p className="text-[11px] text-emerald-700 font-medium">
                                    🛡️ Free cancellation up to 24 hours before your trip starts.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}