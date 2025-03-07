"use client";
import { useState } from "react";
import axios from "axios";

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
    serviceType: [],
    appointmentDate: "",
    appointmentTime: "",
    address: {
      houseNumber: "",
      street: "",
      city: "Jaipur",
      pincode: "",
    },
    totalCost: 0,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "serviceType") {
      setFormData((prevData) => {
        const selectedService = serviceList.find((s) => s.name === value);
        if (!selectedService) return prevData;

        let updatedServices = checked
          ? [...prevData.serviceType, selectedService]
          : prevData.serviceType.filter((s) => s.name !== value);

        return {
          ...prevData,
          serviceType: updatedServices,
          totalCost: updatedServices.reduce(
            (sum, service) => sum + service.price,
            0
          ),
        };
      });
    } else if (["houseNumber", "street", "pincode"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setMessage("Please fill in your name, phone.");
      return;
    }

    if (!formData.appointmentDate || !formData.appointmentTime) {
      setMessage("Please select a valid appointment date and time.");
      return;
    }

    if (
      !formData.address.houseNumber ||
      !formData.address.street ||
      !formData.address.pincode
    ) {
      setMessage("Please provide a valid address.");
      return;
    }

    if (formData.serviceType.length === 0) {
      setMessage("Please select at least one service.");
      return;
    }

    const parsedDate = new Date(formData.appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      setMessage("Invalid appointment date.");
      return;
    }

    const formattedDate = parsedDate.toISOString(); // Safe conversion

    try {
      const { data } = await axios.post("/api/booking", {
        ...formData,
        appointmentDate: formattedDate,
      });

      setMessage(data.message || "Booking Successful!");
    } catch (error) {
      setMessage("Something went wrong! Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Schedule Service</h2>

      {/* Personal Details */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded mb-3"
        required
      />

      {/* Multi-Select Service Type */}
      <div className="mb-3">
        <label className="block font-medium">Select Services:</label>
        {serviceList.map((service) => (
          <label key={service.name} className="block">
            <input
              type="checkbox"
              name="serviceType"
              value={service.name}
              checked={formData.serviceType.some(
                (s) => s.name === service.name
              )}
              onChange={handleChange}
            />{" "}
            {service.name} (₹{service.price})
          </label>
        ))}
      </div>

      {/* Appointment Date & Time */}
      <input
        type="date"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="time"
        name="appointmentTime"
        value={formData.appointmentTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      {/* Address Fields */}
      <h3 className="font-medium mb-2">Address Details</h3>
      <input
        type="text"
        name="houseNumber"
        value={formData.address.houseNumber}
        onChange={handleChange}
        placeholder="House Number"
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="text"
        name="street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="text"
        name="pincode"
        value={formData.address.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full p-2 border rounded mb-3"
        required
      />

      {/* Payment Method */}

      {/* Total Cost */}
      <div className="text-lg font-semibold mb-3">
        Total Cost: ₹{formData.totalCost}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Confirm Booking
      </button>

      {message && <div className="mt-3 text-center">{message}</div>}
    </form>
  );
}
