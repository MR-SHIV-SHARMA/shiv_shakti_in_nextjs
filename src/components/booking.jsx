"use client";

import { useState } from "react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: [], // Multiple services will be stored in an array
    appointmentDate: "",
    appointmentTime: "",
    problemDescription: "",
    imageUrl: "",
    address: {
      houseNumber: "",
      street: "",
      city: "Jaipur",
      pincode: "",
    },
    paymentMethod: "Cash on Service",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "serviceType") {
      // Handle multiple services selection using checkboxes
      setFormData((prevData) => ({
        ...prevData,
        serviceType: checked
          ? [...prevData.serviceType, value] // Add service if checked
          : prevData.serviceType.filter((service) => service !== value), // Remove service if unchecked
      }));
    } else if (["houseNumber", "street", "pincode"].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert Date to Proper Format
    const formattedDate = new Date(formData.appointmentDate).toISOString();

    const finalData = {
      ...formData,
      appointmentDate: formattedDate,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON!");
      }

      const result = await res.json();
      setMessage(result.message || "Booking Successful!");
    } catch (error) {
      setMessage("Something went wrong! Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 sm:mx-auto max-w-xl lg:max-w-2xl p-4 sm:p-6 bg-white rounded-xl shadow-sm sm:shadow-md my-4 sm:my-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        Schedule Service
      </h2>

      <div className="space-y-4 sm:space-y-5">
        {/* Personal Details */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Multi-Select Service Type */}
        <div className="space-y-1">
          <label className="text-xs sm:text-sm font-medium text-gray-600">Select Services</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["AC Repair", "Refrigerator Repair", "Washing Machine Repair", "TV & Appliances", "Plumbing", "Electrical Repair"].map((service) => (
              <label key={service} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="serviceType"
                  value={service}
                  checked={formData.serviceType.includes(service)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-gray-600">Preferred Date</label>
            <input
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-gray-600">Preferred Time</label>
            <input
              type="time"
              name="appointmentTime"
              required
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
          <h3 className="text-sm sm:text-base font-semibold text-gray-700">Service Address</h3>
          
          <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
            <input
              type="text"
              name="houseNumber"
              placeholder="House No."
              required
              value={formData.address.houseNumber}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              required
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              name="city"
              value="Jaipur"
              disabled
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-gray-100"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              value={formData.address.pincode}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition hover:scale-105"
        >
          Confirm Booking
        </button>

        {/* Status Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("wrong") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
