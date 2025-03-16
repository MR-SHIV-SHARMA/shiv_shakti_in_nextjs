import { useState, useEffect } from "react";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", title: "", description: "", price: "", icon: "" });
  const [editingService, setEditingService] = useState(null); // जिस सर्विस को एडिट करना है

  // 📌 1. API से सर्विस डेटा लाने का फ़ंक्शन (GET)
  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 📌 2. नई सर्विस जोड़ने का फ़ंक्शन (POST)
  const addService = async () => {
    try {
      const response = await axios.post("/api/services", form);
      if (response.data.success) {
        setForm({ name: "", title: "", description: "", price: "", icon: "" });
        fetchServices(); // नई सर्विस ऐड करने के बाद लिस्ट अपडेट करें
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // 📌 3. सर्विस अपडेट करने का फ़ंक्शन (PATCH)
  const updateService = async () => {
    if (!editingService) return;

    try {
      const response = await axios.patch(`/api/services`, { id: editingService._id, ...form });
      if (response.data.success) {
        setEditingService(null);
        setForm({ name: "", title: "", description: "", price: "", icon: "" });
        fetchServices(); // अपडेट के बाद डेटा रीफ्रेश करें
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // 📌 4. सर्विस डिलीट करने का फ़ंक्शन (DELETE)
  const deleteService = async (id) => {
    try {
      const response = await axios.delete(`/api/services`, { data: { id } });
      if (response.data.success) {
        fetchServices(); // डिलीट के बाद लिस्ट अपडेट करें
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // 📌 फॉर्म इनपुट को हैंडल करने का फ़ंक्शन
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      {/* 🔹 सर्विस जोड़ने और अपडेट करने का फॉर्म */}
      <div className="border p-4 mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Service Name"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Service Title"
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Service Description"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Service Price"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="Service Icon (URL or Name)"
          className="border p-2 w-full mb-2"
        />
        
        {editingService ? (
          <button
            onClick={updateService}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Service
          </button>
        ) : (
          <button
            onClick={addService}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        )}
      </div>

      {/* 🔹 सर्विस लिस्ट (Read, Update, Delete) */}
      <div className="border p-4">
        <h2 className="text-xl font-bold mb-2">Services List</h2>
        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li
                key={service._id}
                className="border p-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setForm(service);
                      setEditingService(service);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
