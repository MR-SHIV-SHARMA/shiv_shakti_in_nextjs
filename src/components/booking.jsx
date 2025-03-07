"use client";

import { useState } from "react";

export default function BookingPage() {
  const serviceList = [
    { name: "AC Repair", price: 500 },
    { name: "Refrigerator Repair", price: 700 },
    { name: "Washing Machine Repair", price: 600 },
    { name: "TV & Appliances", price: 400 },
    { name: "Plumbing", price: 350 },
    { name: "Electrical Repair", price: 450 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: [],
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
    totalCost: 0, // Automatically calculated
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "serviceType") {
      setFormData((prevData) => {
        const selectedService = serviceList.find((s) => s.name === value);

        let updatedServices;
        if (checked) {
          updatedServices = [...prevData.serviceType, selectedService]; // Store object {name, price}
        } else {
          updatedServices = prevData.serviceType.filter(
            (s) => s.name !== value
          );
        }

        // Calculate total cost
        const totalCost = updatedServices.reduce(
          (total, service) => total + service.price,
          0
        );

        return {
          ...prevData,
          serviceType: updatedServices,
          totalCost,
        };
      });
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

    // Convert serviceType from array of names to array of { name, price } objects
    const selectedServices = formData.serviceType
      .map((serviceName) => {
        const service = serviceList.find((s) => s.name === serviceName);
        return service ? { name: service.name, price: service.price } : null;
      })
      .filter(Boolean); // Remove null values

    // Ensure totalCost is correctly calculated
    const totalCost = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    const finalData = {
      ...formData,
      serviceType: selectedServices,
      appointmentDate: formattedDate,
      totalCost,
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
            <label className="text-xs sm:text-sm font-medium text-gray-600">
              Full Name
            </label>
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
            <label className="text-xs sm:text-sm font-medium text-gray-600">
              Phone Number
            </label>
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

        {/* Multi-Select Service Type with Price */}
        <div className="space-y-1">
          <label className="text-xs sm:text-sm font-medium text-gray-600">
            Select Services
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {serviceList.map((service) => (
              <label
                key={service.name}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="serviceType"
                  value={service.name}
                  checked={formData.serviceType.some(
                    (s) => s.name === service.name
                  )}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  {service.name} (₹{service.price})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Display Total Cost */}
        <div className="text-lg font-semibold text-gray-700">
          Total Cost: ₹{formData.totalCost}
        </div>

        {/* Date & Time */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-gray-600">
              Preferred Date
            </label>
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
            <label className="text-xs sm:text-sm font-medium text-gray-600">
              Preferred Time
            </label>
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-700">
            Service Address
          </h3>

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

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              message.includes("wrong")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
