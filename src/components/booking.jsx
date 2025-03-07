"use client";

import { useState } from "react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "AC Repair",
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
    const { name, value } = e.target;

    // Check if the field is part of address
    if (["houseNumber", "street", "pincode"].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address, // Keep previous address fields
          [name]: value, // Update only the specific field
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
      appointmentDate: formattedDate, // Fixing the date format
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
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>

      <label className="block">Full Name:</label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block">Phone Number:</label>
      <input
        type="text"
        name="phone"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block">Service Type:</label>
      <select
        name="serviceType"
        value={formData.serviceType}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      >
        <option>AC Repair</option>
        <option>Refrigerator Repair</option>
        <option>Washing Machine Repair</option>
        <option>TV & Appliances</option>
      </select>

      <label className="block">Preferred Date:</label>
      <input
        type="date"
        name="appointmentDate"
        required
        value={formData.appointmentDate}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block">Preferred Time:</label>
      <input
        type="time"
        name="appointmentTime"
        required
        value={formData.appointmentTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block">Address:</label>
      <input
        type="text"
        name="houseNumber"
        placeholder="House No."
        required
        value={formData.address.houseNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        required
        value={formData.address.street}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="city"
        value="Jaipur"
        disabled
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        required
        value={formData.address.pincode}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit Booking
      </button>

      {/* ✅ API Response Message Show Karna */}
      {message && (
        <p
          className={`mt-4 text-center p-2 rounded ${
            message.includes("wrong")
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
