import { useState, useEffect } from "react";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    price: {
      installation: { cost: "", details: [] },
      service: { cost: "", details: [] },
      repair: { cost: "", details: [] },
    },
    icon: "",
  });
  const [editingService, setEditingService] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Toggle state

  // 📌 Fetch Services (GET)
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

  // 📌 Add Service (POST)
  const addService = async () => {
    try {
      const response = await axios.post("/api/services", { ...form });
      if (response.data.success) {
        resetForm();
        fetchServices();
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // 📌 Update Service (PATCH)
  const updateService = async () => {
    if (!editingService) return;
    try {
      const response = await axios.patch(`/api/services`, {
        id: editingService._id,
        ...form,
      });
      if (response.data.success) {
        resetForm();
        fetchServices();
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // 📌 Delete Service (DELETE)
  const deleteService = async (id) => {
    try {
      const response = await axios.delete(`/api/services`, { data: { id } });
      if (response.data.success) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // 📌 Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("price.")) {
      const [_, category, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [category]: {
            ...prev.price[category],
            [field]: field === "cost" ? Number(value) : value.split("\n"),
          },
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 📌 Reset Form after Add/Update
  const resetForm = () => {
    setForm({
      name: "",
      title: "",
      description: "",
      price: {
        installation: { cost: "", details: [] },
        service: { cost: "", details: [] },
        repair: { cost: "", details: [] },
      },
      icon: "",
    });
    setEditingService(null);
  };

  return (
    <div className="p-2 md:p-6">
      {/* 🔹 Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        {isOpen ? "Close" : "Open"} Manage Services
      </button>

      {/* 🔹 Show/Hide Content Based on isOpen */}
      {isOpen && (
        <>
          <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

          {/* 🔹 Form for Adding/Updating Service */}
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

            {/* Price Fields */}
            {["installation", "service", "repair"].map((category) => (
              <div key={category} className="mb-2 p-2 border rounded">
                <p className="font-semibold capitalize">{category} Price</p>
                <input
                  type="number"
                  name={`price.${category}.cost`}
                  value={form.price?.[category]?.cost || ""}
                  onChange={handleChange}
                  placeholder={`${category} Cost`}
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  name={`price.${category}.details`}
                  value={form.price?.[category]?.details?.join("\n") || ""}
                  onChange={handleChange}
                  placeholder={`${category} Details (one per line)`}
                  className="border p-2 w-full"
                />
              </div>
            ))}

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

          {/* 🔹 Service List */}
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
                      <p className="font-semibold">Name: {service.name}</p>
                      <p className="text-gray-500 text-sm">
                        Title: {service.title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Description: {service.description}
                      </p>

                      {service.price &&
                        Object.entries(service.price).map(([key, value]) => (
                          <div key={key} className="mt-2">
                            <p className="text-gray-700 font-semibold capitalize">
                              {key} - ₹{value.cost}
                            </p>
                            <ul className="text-gray-500 text-sm list-disc pl-5">
                              {value.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        ))}

                      <p className="text-gray-500 text-sm">
                        Icon: {service.icon}
                      </p>
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
        </>
      )}
    </div>
  );
}
