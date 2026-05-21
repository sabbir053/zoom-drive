'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
  </div>
);

const CarDetailsPage = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const id = params?.id;

  const user = { email: "user@example.com" }; 

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [driverNeeded, setDriverNeeded] = useState('No');
  const [specialNote, setSpecialNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCar(data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCarDetails();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingPayload = {
      carId: car._id,
      carName: car.carName,
      carImage: car.imageUrl || car.image,
      carType: car.carType || 'Standard',
      totalPrice: car.dailyRentPrice || car.dailyPrice || 0,
      bookingDate: new Date().toLocaleDateString(),
      driverNeeded,
      specialNote,
      userEmail: user?.email || "guest@example.com",
      status: "Pending"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });
      
      if (res.ok) {
        setBookingSuccess(true);
        
        setTimeout(() => {
          setIsModalOpen(false); 
          setBookingSuccess(false);
          setSpecialNote('');
          setDriverNeeded('No');
        }, 2500);
      } else {
        console.error("Failed to save booking to database");
      }

    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h2 className="text-2xl font-bold text-[#0A2540]">Vehicle Not Found!</h2>
        <p className="text-gray-500 my-2">The car you are looking for might be unavailable.</p>
        <Link href="/cars" className="btn bg-[#0A2540] text-white mt-4 px-6 h-11 border-none hover:bg-[#FF6B00] rounded-xl flex items-center justify-center font-bold">
          Back to Available Cars
        </Link>
      </div>
    );
  }

  const price = car.dailyRentPrice || car.dailyPrice || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <Link href="/cars" className="text-sm font-semibold text-[#FF6B00] hover:underline flex items-center gap-2">
            ➔ Back to Available Cars
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6 border-gray-100">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-md">
                {car.carType || 'Premium'} Category
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#0A2540]">
                {car.carName}
              </h1>
              <p className="text-sm text-gray-400 font-medium">
                Car ID: <span className="text-gray-600 font-mono">{car._id}</span>
              </p>
            </div>
            
            <div className="bg-[#0A2540] text-white px-5 py-3 rounded-2xl text-center md:text-right shadow-md self-start md:self-center">
              <p className="text-xs text-gray-300 uppercase font-bold tracking-wider">Rental Rate</p>
              <p className="text-xl font-medium mt-0.5">
                <span className="text-[#FF6B00] text-3xl font-black">৳{price}</span> / day
              </p>
            </div>
          </div>

          <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
            <span className={`absolute top-4 left-4 z-10 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-md shadow-sm ${car.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {car.availabilityStatus || 'Available'}
            </span>
            <img
              src={car.imageUrl || car.image}
              alt={car.carName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transmission</p>
              <p className="text-base font-black text-[#0A2540] mt-1">{car.transmission || 'Automatic'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fuel Type</p>
              <p className="text-base font-black text-[#0A2540] mt-1">{car.fuelType || 'Octane'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seat Capacity</p>
              <p className="text-base font-black text-[#0A2540] mt-1">{car.seatCapacity || car.seatingCapacity || 4} Seats</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup Location</p>
              <p className="text-base font-black text-[#0A2540] mt-1 truncate px-1" title={car.pickupLocation}>
                {car.pickupLocation || 'Not Specified'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold text-[#0A2540] border-b pb-2 border-gray-100">
              Vehicle Description
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {car.description || "No specific description available for this car rental option."}
            </p>
          </div>

          {car.features && car.features.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-[#0A2540]">Premium Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200">
                        {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={car.availabilityStatus === 'Unavailable'}
              className={`btn px-8 h-12 font-bold text-white rounded-xl shadow-md transition-all duration-300 border-none ${
                car.availabilityStatus === 'Unavailable' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#0A2540] hover:bg-[#FF6B00]'
              }`}
            >
              {car.availabilityStatus === 'Unavailable' ? 'Not Available for Rent' : 'Book Now'}
            </button>
          </div>

        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#0A2540]">Confirm Your Booking</h3>
                <p className="text-xs text-gray-400 mt-0.5">{car.carName}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-2 py-6">
                <h4 className="font-bold text-sm">Booking Request Submitted!</h4>
                <p className="text-xs text-emerald-600">Your rental vehicle allocation has been processed successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-bold text-gray-600 text-xs">Driver Needed?</span>
                  </label>
                  <select
                    value={driverNeeded}
                    onChange={(e) => setDriverNeeded(e.target.value)}
                    className="select select-bordered w-full h-11 min-h-0 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl"
                  >
                    <option value="No">No (Self Drive)</option>
                    <option value="Yes">Yes (Professional Driver Included)</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-bold text-gray-600 text-xs">Special Note / Instructions</span>
                  </label>
                  <textarea
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="Enter any specific preferences, pickup time requirements, or special details..."
                    className="textarea textarea-bordered w-full h-24 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl p-3 resize-none"
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-xl text-xs space-y-1.5 text-gray-500 border border-gray-100">
                  <div className="flex justify-between">
                    <span>Base Rent (Daily):</span>
                    <span className="font-semibold text-gray-700">৳{price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#0A2540] pt-1.5 border-t border-gray-200">
                    <span>Payable Rent:</span>
                    <span className="text-[#FF6B00]">৳{price}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold border-none h-11 min-h-0 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn flex-1 bg-[#0A2540] hover:bg-[#FF6B00] text-white font-bold border-none h-11 min-h-0 rounded-xl shadow-sm"
                  >
                    {submitting ? 'Processing...' : 'Book Now'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetailsPage;