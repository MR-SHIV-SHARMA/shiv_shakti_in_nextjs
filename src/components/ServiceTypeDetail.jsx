"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const fetchService = async () => {
  const { data } = await axios.get(`/api/services`);
  if (!data.success) {
    throw new Error("API Error: Service not found");
  }
  return data.data;
};

const ServiceTypeDetail = () => {
  const { serviceId, serviceType } = useParams();
  const router = useRouter(); // ✅ Define router

  // ✅ React Query से Data Fetch कर रहे हैं
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchService,
    staleTime: 10 * 60 * 1000, // 10 मिनट तक data fresh रहेगा
    cacheTime: 30 * 60 * 1000, // 30 मिनट तक cache में रहेगा
  });

  // ✅ Data Processing Logic
  let service = null;
  let serviceName = serviceType;

  if (!isLoading && services) {
    const foundService = services.find((s) => s._id === serviceId);

    if (foundService) {
      if (foundService.price[serviceType]) {
        service = foundService.price[serviceType];
      } else {
        for (const key in foundService.price) {
          if (foundService.price[key]._id === serviceType) {
            service = foundService.price[key];
            serviceName = key;
            break;
          }
        }
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading service details...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error?.message || "Service not found"}
      </div>
    );
  }

  const formattedServiceName =
    serviceName.charAt(0).toUpperCase() + serviceName.slice(1);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 md:p-10 lg:p-16 flex flex-col items-center text-center space-y-8 bg-gray-50"
    >
      {/* Back Navigation */}
      <button
        onClick={() => router.back()}
        className="self-start flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* Main Content */}
      <div className="max-w-4xl w-full space-y-8">
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {formattedServiceName}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600">
              <span className="text-gray-500">Starting from</span>
              <br />₹{service.cost}
            </h2>
          </div>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          className="grid gap-4 text-left"
        >
          {service.details.map((detail, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 text-md md:text-lg">
                  {detail}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <Link
          href={`/booking`}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceTypeDetail;
