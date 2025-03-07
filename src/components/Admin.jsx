"use client";
import { useEffect, useState } from "react";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        console.error("Error fetching bookings");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update booking status
  const updateBookingStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/booking", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        fetchBookings(); // Refresh bookings list
      } else {
        console.error("Error updating booking:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to delete a booking
  const deleteBooking = async (id) => {
    try {
      const res = await fetch("/api/booking", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchBookings(); // Refresh bookings list
      } else {
        console.error("Error deleting booking:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to categorize bookings by date
  const categorizeBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const categories = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      "This Month": [],
      "Past 3 Months": [],
      Upcoming: [],
    };

    bookings.forEach((booking) => {
      const appointmentDate = new Date(booking.appointmentDate);
      appointmentDate.setHours(0, 0, 0, 0);

      const diffDays = Math.round(
        (appointmentDate - today) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        categories.Today.push(booking);
      } else if (diffDays === -1) {
        categories.Yesterday.push(booking);
      } else if (appointmentDate >= oneWeekAgo && appointmentDate < today) {
        categories["This Week"].push(booking);
      } else if (appointmentDate >= oneMonthAgo && appointmentDate < today) {
        categories["This Month"].push(booking);
      } else if (appointmentDate >= threeMonthsAgo && appointmentDate < today) {
        categories["Past 3 Months"].push(booking);
      } else {
        categories.Upcoming.push(booking);
      }
    });

    return categories;
  };

  const categorizedBookings = categorizeBookings();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        Object.entries(categorizedBookings).map(([category, bookings]) =>
          bookings.length > 0 ? (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Service</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Address</th>
                    <th className="border p-2">Pincode</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="text-center">
                      <td className="border p-2 align-baseline">
                        {booking.name}
                      </td>
                      <td className="border p-2 align-baseline">
                        {booking.phone}
                      </td>

                      {/* 🛠 Services (Each in a New Line) */}
                      <td className="border p-2 align-baseline">
                        {booking.serviceType.map((service, index) => (
                          <div key={index}>{service.name}</div>
                        ))}
                      </td>

                      {/* 🛠 Prices (Each in a New Line) */}
                      <td className="border p-2 align-baseline">
                        {booking.serviceType.map((service, index) => (
                          <div key={index}>₹{service.price}</div>
                        ))}
                      </td>

                      <td className="border p-2 align-baseline">
                        {new Date(booking.appointmentDate).toLocaleDateString()}
                      </td>

                      <td className="border p-2 align-baseline">
                        {booking.appointmentTime}
                      </td>
                      <td className="border p-2 align-baseline">
                        {booking.address
                          ? `${booking.address.houseNumber}, ${booking.address.street}, ${booking.address.city}`
                          : "N/A"}
                      </td>
                      <td className="border p-2 align-baseline">
                        {booking.address?.pincode || "N/A"}
                      </td>

                      <td className="border p-2 align-baseline">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateBookingStatus(booking._id, e.target.value)
                          }
                          className="border p-1 rounded"
                        >
                          <option value="Pending">🕒</option>
                          <option value="Completed">✅</option>
                          <option value="Cancelled">❌</option>
                        </select>
                      </td>

                      {/* 🛠 Total Cost Aligned Center */}
                      <td className="border p-2 font-bold align-baseline">
                        ₹{booking.totalCost}
                      </td>

                      <td className="border p-2 align-baseline">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
