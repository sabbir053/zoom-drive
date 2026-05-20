"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ডাটাবেজ থেকে আসা ডামি ডেটা স্ট্রাকচার (কমপক্ষে ৬টি কার্ড)
const mockCarsData = [
    {
        _id: "car_01",
        carModel: "Tesla Model 3",
        carType: "Electric / Luxury",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 85,
        transmission: "Automatic",
        fuelType: "Electric",
        seatingCapacity: 5,
        isAvailable: true
    },
    {
        _id: "car_02",
        carModel: "Toyota RAV4",
        carType: "SUV / Family",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 60,
        transmission: "Automatic",
        fuelType: "Hybrid",
        seatingCapacity: 5,
        isAvailable: true
    },
    {
        _id: "car_03",
        carModel: "BMW 5 Series",
        carType: "Sedan / Premium",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 120,
        transmission: "Automatic",
        fuelType: "Octane",
        seatingCapacity: 5,
        isAvailable: true
    },
    {
        _id: "car_04",
        carModel: "Ford Mustang GT",
        carType: "Sports / Coupe",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 150,
        transmission: "Manual",
        fuelType: "Petrol",
        seatingCapacity: 4,
        isAvailable: true
    },
    {
        _id: "car_05",
        carModel: "Hyundai Grand Starex",
        carType: "Microbus / Van",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 95,
        transmission: "Automatic",
        fuelType: "Diesel",
        seatingCapacity: 11,
        isAvailable: true
    },
    {
        _id: "car_06",
        carModel: "Audi Q7",
        carType: "SUV / Luxury",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
        pricePerDay: 140,
        transmission: "Automatic",
        fuelType: "Octane",
        seatingCapacity: 7,
        isAvailable: true
    }
];

export default function AvailableCars() {
    // দ্রষ্টব্য: ভবিষ্যতে ডাটাবেজ থেকে ডেটা আনার জন্য এখানে fetch/axios ব্যবহার করবেন।
    const cars = mockCarsData;

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
                    <span className="text-[#FF6B00] text-xs md:text-sm font-extrabold uppercase tracking-widest bg-[#FF6B00]/10 px-4 py-1.5 rounded-full">
                        Our Fleet
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#0A2540]">
                        Explore Available Cars
                    </h2>
                    <div className="w-16 h-1 bg-[#FF6B00] mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-sm md:text-base">
                        Choose from our highly maintained and diverse collection of vehicles ready for your next destination.
                    </p>
                </div>

                {/* Cars Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                        >
                            {/* Image Section */}
                            <div className="relative w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                                {/* Availability Badge */}
                                <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-sm">
                                    Available
                                </span>

                                <img
                                    src={car.image}
                                    alt={car.carModel}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                {/* Price Tag Overlay */}
                                <div className="absolute bottom-4 right-4 bg-[#0A2540] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                                    <span className="text-[#FF6B00] text-lg">${car.pricePerDay}</span> / day
                                </div>
                            </div>

                            {/* Card Details Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                        {car.carType}
                                    </span>
                                    <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#FF6B00] transition-colors duration-200">
                                        {car.carModel}
                                    </h3>
                                </div>

                                {/* Key Specifications Grid */}
                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">Transmission</p>
                                        <p className="text-xs font-bold text-gray-700">{car.transmission}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">Fuel</p>
                                        <p className="text-xs font-bold text-gray-700">{car.fuelType}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">Seats</p>
                                        <p className="text-xs font-bold text-gray-700">{car.seatingCapacity} Seats</p>
                                    </div>
                                </div>

                                {/* Requirements: View Details Button */}
                                <div className="pt-2">
                                    <Link
                                        href={`/cars/${car._id}`}
                                        className="btn w-full bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold transition-all duration-300 shadow-md shadow-[#0A2540]/10 flex items-center justify-center gap-2"
                                    >
                                        View Details
                                        <span className="text-xs">➔</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}