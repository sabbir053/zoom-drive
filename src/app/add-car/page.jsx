"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCarPage = () => {
  
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    carName: '', 
    carType: 'SUV',
    imageUrl: '',
    dailyRentPrice: '',
    transmission: 'Automatic',
    fuelType: 'Octane',
    seatingCapacity: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const processedData = {
      ...formData,
      dailyRentPrice: Number(formData.dailyRentPrice),
      seatingCapacity: Number(formData.seatingCapacity)
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData)
      });
      
      if (response.ok) {
        setSuccessMessage(true);
        
        setTimeout(() => {
          router.push('/cars'); 
        }, 2000);
      } else {
        console.error("Server responded with an error");
      }

    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 py-12 text-gray-800">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-[#0A2540]">
            Add a New <span className="text-[#FF6B00]">Vehicle</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Fill out the form below to add a premium car to your rental fleet inventory.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 relative">
          
          {/* কাস্টম সাকসেস নোটিফিকেশন */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center font-bold text-sm animate-fadeIn">
              🎉 Vehicle published successfully! Redirecting to inventory...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Layout Line 1: Model & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Model Input */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Car Model Name *</span></label>
                <input 
                  type="text" 
                  name="carName"
                  required
                  placeholder="e.g. Tesla Model Y, Audi A6" 
                  value={formData.carName}
                  onChange={handleChange}
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                />
              </div>

              {/* Car Type Dropdown */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Car Category *</span></label>
                <select 
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="select select-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                >
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                  <option value="Sports">Sports</option>
                  <option value="Microbus">Microbus</option>
                  <option value="Sedan">Sedan</option>
                </select>
              </div>
            </div>

            {/* Image URL Input */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Image URL *</span></label>
              <input 
                type="url" 
                name="imageUrl"
                required
                placeholder="https://images.unsplash.com/... or any hosting link" 
                value={formData.imageUrl}
                onChange={handleChange}
                className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
              />
            </div>

            {/* Grid Layout Line 2: Price & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Per Day */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Price Per Day (৳) *</span></label>
                <input 
                  type="number" 
                  name="dailyRentPrice"
                  required
                  min="1"
                  placeholder="e.g. 2500" 
                  value={formData.dailyRentPrice}
                  onChange={handleChange}
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                />
              </div>

              {/* Seating Capacity */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Seating Capacity *</span></label>
                <input 
                  type="number" 
                  name="seatingCapacity"
                  required
                  min="1"
                  placeholder="e.g. 5 or 7" 
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                  className="input input-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                />
              </div>
            </div>

            {/* Grid Layout Line 3: Transmission & Fuel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transmission Dropdown */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Transmission *</span></label>
                <select 
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="select select-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Fuel Type Dropdown */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Fuel Type *</span></label>
                <select 
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="select select-bordered w-full h-11 text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl px-4"
                >
                  <option value="Octane">Octane</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Car Description (Optional)</span></label>
              <textarea 
                name="description"
                rows="4"
                placeholder="Write a brief overview about the car's condition, features, or rental terms..." 
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00] bg-gray-50 rounded-xl p-3 resize-none"
              ></textarea>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-end">
              <button 
                type="button"
                onClick={() => router.back()}
                className="btn bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-8 h-11 min-h-0 border-none rounded-xl order-2 sm:order-1"
              >
                Cancel
              </button>
              
              <button 
                type="submit"
                disabled={loading}
                className="btn bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold px-10 h-11 min-h-0 rounded-xl shadow-md order-1 sm:order-2"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  'Publish Vehicle ➔'
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddCarPage;