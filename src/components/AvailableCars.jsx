import React from 'react';
import Link from 'next/link';

const fetchCarsData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availablecars`, {
    cache: 'no-store' 
  });
  if (!res.ok) return [];
  
  const data = await res.json();
  return data;
};

const AvailableCars = async () => {
    
  const carsData = await fetchCarsData();

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-[#FF6B00] text-xs md:text-sm font-extrabold uppercase tracking-widest bg-[#FF6B00]/10 px-4 py-1.5 rounded-full inline-block">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {carsData?.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div className="relative w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <span className={`absolute top-4 left-4 z-10 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-sm ${car.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                  {car.availabilityStatus}
                </span>

                <img
                  src={car.imageUrl}
                  alt={car.carName}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute bottom-4 right-4 bg-[#0A2540] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                  <span className="text-[#FF6B00] text-lg">৳{car.dailyPrice}</span> / day
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {car.carType} Category
                  </span>
                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-[#FF6B00] transition-colors duration-200 line-clamp-1">
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

                <div className="pt-1">
                  <Link
                    href={`/cars/${car._id}`}
                    className="btn w-full bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold h-11 min-h-0 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    View Details ➔
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

    
        <div className="text-center">
          <Link
            href="/cars"
            className="btn bg-gradient-to-r from-[#0A2540] to-[#143d66] hover:from-[#FF6B00] hover:to-[#e05e00] text-white border-none font-bold px-10 h-12 min-h-0 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2 text-sm tracking-wide group"
          >
            View All Cars
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">➔</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AvailableCars;