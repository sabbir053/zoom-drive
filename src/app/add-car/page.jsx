"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCarPage() {
  const router = useRouter();
  
  // ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    carModel: '',
    carType: 'SUV',
    image: '',
    pricePerDay: '',
    transmission: 'Automatic',
    fuelType: 'Octane',
    seatingCapacity: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডেলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ফর্ম সাবমিট হ্যান্ডেলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // টাইপ কাস্টিং (স্ট্রিং থেকে নাম্বার রূপান্তর)
    const processedData = {
      ...formData,
      pricePerDay: Number(formData.pricePerDay),
      seatingCapacity: Number(formData.seatingCapacity)
    };

    console.log("Submitting Car Data:", processedData);

    try {
      // এখানে আপনার ব্যাকএন্ড API এন্ডপয়েন্ট কল হবে (যেমন: Express.js API)
      // const response = await fetch('http://localhost:5000/api/cars', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(processedData)
      // });
      
      // if (response.ok) {
      //   alert('Car added successfully!');
      //   router.push('/cars'); // সফল হলে এক্সপ্লোর পেজে রিডাইরেক্ট করবে
      // }

      // সাময়িক টেস্টিং এলার্ট
      setTimeout(() => {
        alert('Car added successfully! (Check console for object)');
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error adding car:", error);
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
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Layout Line 1: Model & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Model Input */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Car Model Name *</span></label>
                <input 
                  type="text" 
                  name="carModel"
                  required
                  placeholder="e.g. Tesla Model Y, Audi A6" 
                  value={formData.carModel}
                  onChange={handleChange}
                  className="input input-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              {/* Car Type Dropdown */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Car Category *</span></label>
                <select 
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
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
                name="image"
                required
                placeholder="https://images.unsplash.com/... or any hosting link" 
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            {/* Grid Layout Line 2: Price & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Per Day */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-gray-600 text-sm">Price Per Day ($) *</span></label>
                <input 
                  type="number" 
                  name="pricePerDay"
                  required
                  min="1"
                  placeholder="e.g. 75" 
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  className="input input-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
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
                  className="input input-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
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
                  className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
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
                  className="select select-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
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
                className="textarea textarea-bordered w-full text-sm focus:outline-none focus:border-[#FF6B00]"
              ></textarea>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-end">
              <button 
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline border-gray-300 hover:bg-gray-100 hover:text-gray-800 font-bold px-8 order-2 sm:order-1"
              >
                Cancel
              </button>
              
              <button 
                type="submit"
                disabled={loading}
                className="btn bg-[#0A2540] hover:bg-[#FF6B00] text-white border-none font-bold px-10 shadow-md order-1 sm:order-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
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
}