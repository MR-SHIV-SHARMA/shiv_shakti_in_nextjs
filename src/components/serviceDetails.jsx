"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"; // ✅ React Query import
import { FaTv } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine } from "react-icons/gi";

const fetchServices = async () => {
  const response = await axios.get(`/api/services`);
  return response.data.success ? response.data.data : [];
};

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // ✅ useQuery का उपयोग API कॉल के लिए
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 10 * 60 * 1000, // 10 मिनट तक fresh data रहेगा
    cacheTime: 30 * 60 * 1000, // 30 मिनट तक cache में रहेगा
  });

  const service = services?.find((s) => s._id === serviceId);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            ⚠️ Service Not Found
          </h2>
          <Link
            href="/services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Browse All Services
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto min-h-screen"
    >
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        /<span className="font-semibold text-gray-800"> {service.title}</span>
      </nav>

      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-8"
        >
          <div className="p-4 bg-white rounded-full shadow-lg border-2 border-gray-200">
            {/* ✅ Fix: सही Icon या Image Render करें */}
            {["tv", "ac", "refrigerator", "washing-machine"].includes(
              service.icon
            ) ? (
              <>
                {service.icon === "tv" && (
                  <FaTv size={60} className="text-black" />
                )}
                {service.icon === "ac" && (
                  <TbAirConditioning size={60} className="text-black" />
                )}
                {service.icon === "refrigerator" && (
                  <CgSmartHomeRefrigerator size={60} className="text-black" />
                )}
                {service.icon === "washing-machine" && (
                  <GiWashingMachine size={60} className="text-black" />
                )}
              </>
            ) : service.icon?.startsWith("/") ? (
              <img
                src={service.icon}
                alt={service.title}
                className="w-20 h-20 object-contain"
              />
            ) : (
              <span className="text-6xl">🔧</span> // Default Fallback Icon
            )}
          </div>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          {service.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
          {service.description}
        </p>

        {/* 🔥 Fix for price object rendering */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Pricing & Package Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.price && typeof service.price === "object" ? (
              Object.entries(service.price).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {key.replace(/-/g, " ")}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-6">
                    ₹{value.cost}
                  </div>

                  <ul className="text-left mb-6 space-y-2">
                    {value.features?.map((feature, i) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link
                      href={`/service/${serviceId}/${value._id}`}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/booking`}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No pricing information available.</p>
            )}
          </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 sm:hidden z-50 border-t border-gray-200">
          <button className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-green-700 transition duration-300">
            Book Service Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
