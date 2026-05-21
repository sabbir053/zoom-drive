import React from 'react';
import Link from 'next/link';

const fetchCarsData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    cache: 'no-store' 
  });
  if (!res.ok) return [];
  return res.json();
};

const ExploreCarsPage = async ({ searchParams }) => {
  
  const params = await searchParams;
  const searchQuery = params?.search || '';
  const selectedType = params?.type || 'All';
  const sortByPrice = params?.sort || 'default';

  const carsData = await fetchCarsData();

  const filteredCars = carsData
    .filter((car) => {
      const matchesSearch = (car?.carName || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || car?.carType === selectedType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortByPrice === 'low-to-high') return (a?.dailyPrice || 0) - (b?.dailyPrice || 0);
      if (sortByPrice === 'high-to-low') return (b?.dailyPrice || 0) - (a?.dailyPrice || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-10 text-center lg:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-[#0A2540]">
            Explore Our <span className="text-[#FF6B00]">Premium Fleet</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Find the perfect vehicle for your next journey. Use filters to narrow down your choices.
          </p>
        </div>

        
        <form action="/cars" method="GET" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          
          <div className="w-full">
            <label className="block mb-1 text-gray-500 font-bold text-xs">Search Car Model</label>
            <input 
              type="text" 
              name="search"
              placeholder="e.g. Toyota, Honda..." 
              defaultValue={searchQuery}
              className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-gray-500 font-bold text-xs">Filter by Type</label>
            <select 
              name="type"
              defaultValue={selectedType}
              className="select select-bordered w-full h-11 min-h-0 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50"
            >
              <option value="All">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-1 text-gray-500 font-bold text-xs">Sort by Price</label>
            <select 
              name="sort"
              defaultValue={sortByPrice}
              className="select select-bordered w-full h-11 min-h-0 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50"
            >
              <option value="default">Default Features</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="w-full md:col-span-3 lg:col-span-1">
            <button type="submit" className="btn bg-[#0A2540] text-white hover:bg-[#FF6B00] border-none h-11 min-h-0 w-full font-bold shadow-sm transition-colors duration-200">
              Apply Filters
            </button>
          </div>

        </form>

        <div className="mb-6 text-sm font-semibold text-gray-500">
          Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} available for booking
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-bold text-[#0A2540]">No Cars Found Matching Your Criteria</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">Try resetting your search query or picking a different vehicle category filter.</p>
            <Link 
              href="/cars" 
              className="btn bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none px-6 inline-flex items-center justify-center h-10 mt-2 font-bold rounded-lg"
            >
              Reset All Filters
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car._id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <span className={`absolute top-4 left-4 z-10 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-sm ${car.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                  {car.availabilityStatus}
                </span>
                <img 
                  src={car.imageUrl} 
                  alt={car.carName}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-[#0A2540] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                  <span className="text-[#FF6B00] text-lg">৳{car.dailyPrice}</span> / day
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {car.carType} Category
                  </span>
                  <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#FF6B00] transition-colors duration-200">
                    {car.carName}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{car.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100 text-center text-xs font-medium text-gray-600">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Capacity</p>
                    <p className="font-bold text-gray-700 mt-0.5">{car.seatCapacity} Seater</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Location</p>
                    <p className="font-bold text-gray-700 mt-0.5 truncate px-1" title={car.pickupLocation}>
                      {car.pickupLocation?.split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link 
                    href={`/cars/${car._id}`}
                    className="btn w-full bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold transition-all duration-300 shadow-md text-center flex items-center justify-center h-12 rounded-xl"
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
};

export default ExploreCarsPage;