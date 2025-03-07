"use client";
import { useState } from "react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "AC Repair",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Booking Confirmed! We will contact you soon.");
        setFormData({ name: "", phone: "", service: "AC Repair", date: "" });
      } else {
        setMessage("❌ Booking Failed. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Error submitting form.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Book a Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="AC Repair">AC Repair</option>
          <option value="Refrigerator Repair">Refrigerator Repair</option>
          <option value="Washing Machine Repair">Washing Machine Repair</option>
          <option value="TV Repair">TV Repair</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
