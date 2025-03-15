"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { serviceDetails } from "./serviceDetails";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

const ServiceTypeDetail = () => {
  const router = useRouter();
  const { serviceId, serviceType } = useParams();
  const service = serviceDetails?.[serviceId];

  if (!service) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-6"
      >
        <div className="text-center space-y-6 max-w-2xl">
          <div className="text-6xl">❌</div>
          <h2 className="text-2xl md:text-3xl font-bold text-red-600">
            Service Not Found
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg
            hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Return to Services
          </button>
        </div>
      </motion.div>
    );
  }

  const serviceData = service.price?.[serviceType];

  if (!serviceData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-6"
      >
        <div className="text-center space-y-6 max-w-2xl">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-600">
            Service Type Not Available
          </h2>
          <button
            onClick={() => router.push(`/service/${serviceId}`)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg
            hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            View Available Packages
          </button>
        </div>
      </motion.div>
    );
  }

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
        {/* Icon & Title Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 
              bg-white rounded-full shadow-lg border-2 border-gray-200"
            >
              {service.icon}
            </motion.div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {service.title}
            <span className="block mt-2 text-2xl md:text-3xl text-blue-600">
              {serviceType.replace(/-/g, " ")}
            </span>
          </h1>
        </motion.div>

        {/* Description & Price */}
        <motion.div variants={itemVariants} className="space-y-6">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {service.description}
          </p>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600">
              <span className="text-gray-500">Starting from</span>
              <br />₹{serviceData.cost}
              <span className="block text-lg text-gray-500 mt-2">
                {serviceData.duration && `for ${serviceData.duration}`}
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.ul
          variants={containerVariants}
          className="grid gap-4 text-left"
        >
          {serviceData.details.map((detail, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200
              hover:shadow-md transition-shadow duration-200"
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

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <button
            className="flex-1 bg-green-500 text-white py-4 px-8 rounded-xl font-semibold
            hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300
            shadow-lg hover:shadow-xl text-lg md:text-xl flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Book Now
          </button>

          <button
            onClick={() => router.push(`/service/${serviceId}`)}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-8 rounded-xl font-semibold
            hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 transition-all duration-300
            shadow-lg hover:shadow-xl text-lg md:text-xl flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Other Packages
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceTypeDetail;
