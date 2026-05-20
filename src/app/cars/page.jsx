"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// ডেটাবেজ থেকে আসা ডামি কার ডেটা লিস্ট
const initialCarsData = [
  {
    _id: "car_01",
    carModel: "Tesla Model 3",
    carType: "Electric",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 85,
    transmission: "Automatic",
    fuelType: "Electric",
    seatingCapacity: 5
  },
  {
    _id: "car_02",
    carModel: "Toyota RAV4",
    carType: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 60,
    transmission: "Automatic",
    fuelType: "Hybrid",
    seatingCapacity: 5
  },
  {
    _id: "car_03",
    carModel: "BMW 5 Series",
    carType: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 120,
    transmission: "Automatic",
    fuelType: "Octane",
    seatingCapacity: 5
  },
  {
    _id: "car_04",
    carModel: "Ford Mustang GT",
    carType: "Sports",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 150,
    transmission: "Manual",
    fuelType: "Petrol",
    seatingCapacity: 4
  },
  {
    _id: "car_05",
    carModel: "Hyundai Grand Starex",
    carType: "Microbus",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 95,
    transmission: "Automatic",
    fuelType: "Diesel",
    seatingCapacity: 11
  },
  {
    _id: "car_06",
    carModel: "Audi Q7",
    carType: "SUV",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
    pricePerDay: 140,
    transmission: "Automatic",
    fuelType: "Octane",
    seatingCapacity: 7
  }
];

export default function ExploreCarsPage() {
  // স্টেট ম্যানেজমেন্ট
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [sortByPrice, setSortByPrice] = useState('default');

  // রিয়েল-টাইম সার্চ এবং ফিল্টারিং লজিক
  const filteredCars = initialCarsData
    .filter((car) => {
      const matchesSearch = car.carModel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || car.carType === selectedType;
      const matchesTrans = selectedTransmission === 'All' || car.transmission === selectedTransmission;
      return matchesSearch && matchesType && matchesTrans;
    })
    .sort((a, b) => {
      if (sortByPrice === 'low-to-high') return a.pricePerDay - b.pricePerDay;
      if (sortByPrice === 'high-to-low') return b.pricePerDay - a.pricePerDay;
      return 0; // ডিফল্ট অর্ডার
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center lg:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-[#0A2540]">
            Explore Our <span className="text-[#FF6B00]">Premium Fleet</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Find the perfect vehicle for your next journey. Use filters to narrow down your choices.
          </p>
        </div>

        {/* Dynamic Interactive Filter & Search Bar Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Search Input widget */}
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text font-bold text-gray-500 text-xs">Search Car Model</span></label>
            <input 
              type="text" 
              placeholder="e.g. Tesla, Toyota..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Car Type Filter */}
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text font-bold text-gray-500 text-xs">Filter by Type</span></label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="All">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
              <option value="Sports">Sports</option>
              <option value="Microbus">Microbus</option>
            </select>
          </div>

          {/* Transmission Filter */}
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text font-bold text-gray-500 text-xs">Transmission</span></label>
            <select 
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="All">All Transmissions</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Price Sorting */}
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text font-bold text-gray-500 text-xs">Sort by Price</span></label>
            <select 
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="default">Default Features</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Results Info Counter */}
        <div className="mb-6 text-sm font-semibold text-gray-500">
          Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} available for booking
        </div>

        {/* Empty State Layout if no cars match search criteria */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-bold text-[#0A2540]">No Cars Found Matching Your Criteria</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">Try resetting your search query or picking a different vehicle category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedTransmission('All'); setSortByPrice('default'); }}
              className="btn btn-sm text-white bg-[#0A2540] hover:bg-[#FF6B00] border-none px-6 mt-2"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Active Grid View Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car._id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              {/* Image Segment */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-sm">
                  Available
                </span>
                <img 
                  src={car.image} 
                  alt={car.carModel}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-[#0A2540] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                  <span className="text-[#FF6B00] text-lg">${car.pricePerDay}</span> / day
                </div>
              </div>

              {/* Specification Specs Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {car.carType} Category
                  </span>
                  <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#FF6B00] transition-colors duration-200">
                    {car.carModel}
                  </h3>
                </div>

                {/* Sub Features Indicators Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center text-xs font-medium text-gray-600">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Gear</p>
                    <p className="font-bold text-gray-700 mt-0.5">{car.transmission}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Fuel</p>
                    <p className="font-bold text-gray-700 mt-0.5">{car.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Capacity</p>
                    <p className="font-bold text-gray-700 mt-0.5">{car.seatingCapacity} Seater</p>
                  </div>
                </div>

                {/* Action Redirect Route Button */}
                <div className="pt-2">
                  <Link 
                    href={`/cars/${car._id}`}
                    className="btn w-full bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold transition-all duration-300 shadow-md"
                  >
                    View Details ➔
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}