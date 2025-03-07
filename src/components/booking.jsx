"use client";
import { useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiSmartphone,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiHome,
  FiNavigation,
} from "react-icons/fi";

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
    <div className="min-h-screen bg-gray-50 sm:p-6 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm"
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-8 rounded-t-2xl">
          <h1 className="text-3xl font-bold mb-2">Book Home Service</h1>
          <p className="opacity-95">
            Quick & reliable service at your doorstep
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Contact Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiUser className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Select Services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceList.map((service) => (
                <label
                  key={service.name}
                  className={`relative flex items-center p-4 rounded-xl border-2 transition-all ${
                    formData.serviceType.some((s) => s.name === service.name)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="serviceType"
                    value={service.name}
                    checked={formData.serviceType.some(
                      (s) => s.name === service.name
                    )}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {service.name}
                    </div>
                    <div className="text-sm text-blue-600">
                      ₹{service.price}
                    </div>
                  </div>
                  <FiCheckCircle
                    className={`ml-2 ${
                      formData.serviceType.some((s) => s.name === service.name)
                        ? "text-blue-500 visible"
                        : "invisible"
                    }`}
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Schedule Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiClock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Service Timing</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </section>

          {/* Address Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiMapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Service Address</h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.address.houseNumber}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="House Number"
                  required
                />
              </div>

              <div className="relative">
                <FiNavigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Street Address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value="Jaipur"
                    readOnly
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Pincode"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Total & Submit */}
          <section className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{formData.totalCost}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  message.includes("Successful")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <FiCheckCircle className="flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </section>
        </div>
      </form>
    </div>
  );
}
