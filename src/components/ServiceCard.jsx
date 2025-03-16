"use client";
import {
  FaSnowflake,
  FaWrench,
  FaFan,
  FaTools,
  FaPlug,
  FaTint,
} from "react-icons/fa";
import { GiChimney, GiWaterDrop } from "react-icons/gi";
import { MdOutlineAcUnit, MdOutlineLocalLaundryService } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Updated Service Data
const services = [
  {
    title: "AC Repair",
    description: "Fast and efficient AC repair services.",
    price: 199,
    icon: <FaWrench />,
  },
  {
    title: "AC Installation",
    description: "Professional AC installation at your home or office.",
    price: 1500,
    icon: <FaTools />,
  },
  {
    title: "AC Maintenance",
    description: "Regular maintenance to ensure top performance.",
    price: 499,
    icon: <FaFan />,
  },
  {
    title: "Fridge Repair",
    description: "Quick fridge repair for all brands and models.",
    price: 299,
    icon: <FaWrench />,
  },
  {
    title: "Fridge Installation",
    description: "Professional fridge installation services.",
    price: 1200,
    icon: <FaPlug />,
  },
  {
    title: "Fridge Maintenance",
    description: "Regular maintenance to keep your fridge running efficiently.",
    price: 499,
    icon: <FaFan />,
  },
  {
    title: "Washing Machine Repair",
    description:
      "Fixing issues with fully automatic & semi-automatic machines.",
    price: 399,
    icon: <MdOutlineLocalLaundryService />,
  },
  {
    title: "Washing Machine Installation",
    description: "Expert installation of washing machines.",
    price: 1500,
    icon: <FaTools />,
  },
  {
    title: "Washing Machine Maintenance",
    description: "Routine servicing to enhance washing machine performance.",
    price: 499,
    icon: <FaFan />,
  },
  {
    title: "Geyser Repair",
    description: "Water heater repair services to ensure hot water supply.",
    price: 199,
    icon: <FaWrench />,
  },
  {
    title: "Geyser Installation",
    description: "Safe and professional geyser installation services.",
    price: 399,
    icon: <FaPlug />,
  },
  {
    title: "Geyser Maintenance",
    description: "Regular servicing to extend geyser lifespan.",
    price: 499,
    icon: <FaTint />,
  },
  {
    title: "Chimney Repair",
    description: "Expert repair of all types of kitchen chimneys.",
    price: 199,
    icon: <GiChimney size="40" />,
  },
  {
    title: "Chimney Installation",
    description: "Installation of kitchen chimneys for a smoke-free kitchen.",
    price: 499,
    icon: <GiChimney size="40" />,
  },
  {
    title: "Chimney Maintenance",
    description: "Thorough cleaning and servicing for efficient performance.",
    price: 1200,
    icon: <GiChimney size="40" />,
  },
  {
    title: "RO Water Purifier Repair",
    description: "Repair services for all types of RO water purifiers.",
    price: 199,
    icon: <GiWaterDrop size="40" />,
  },
  {
    title: "RO Water Purifier Installation",
    description: "Professional installation of RO water purifiers.",
    price: 499,
    icon: <GiWaterDrop size="40" />,
  },
  {
    title: "RO Water Purifier Maintenance",
    description: "Routine service to ensure clean and safe drinking water.",
    price: 399,
    icon: <GiWaterDrop size="40" />,
  },
  {
    title: "Window AC Repair",
    description: "Repair services for all brands of window AC units.",
    price: 199,
    icon: <MdOutlineAcUnit size="40" />,
  },
  {
    title: "Window AC Installation",
    description: "Professional installation of window AC units.",
    price: 499,
    icon: <MdOutlineAcUnit size="40" />,
  },
  {
    title: "Window AC Maintenance",
    description: "Regular servicing for efficient cooling performance.",
    price: 499,
    icon: <MdOutlineAcUnit size="40" />,
  },
];

function ServiceCard({ title, description, price, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group border p-6 rounded-2xl bg-white hover:border-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {price < 500 && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      {/* Animated Icon */}
      <motion.div
        className="flex justify-center mb-6"
        animate={{ rotate: isHovered ? 15 : 0 }}
      >
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-2xl">
          <div className="w-8 h-8 text-blue-600 transition-colors">{icon}</div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 min-h-[60px] text-sm">{description}</p>

        {/* Price Display */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-green-600 font-bold text-2xl">₹{price}</span>
          <span className="text-gray-400 text-sm">/service</span>
        </div>

        {/* Animated Button */}
        <motion.button
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Book Now</span>
          <motion.span animate={{ x: isHovered ? 5 : 0 }}>→</motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [visibleServices, setVisibleServices] = useState(services);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Category filter logic
  useEffect(() => {
    if (selectedCategory === "all") {
      setVisibleServices(services);
    } else {
      setVisibleServices(
        services.filter((service) =>
          service.title.toLowerCase().includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent mb-4">
            Premium Appliance Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expert care for your home appliances with 24/7 support and
            guaranteed satisfaction
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {["all", "AC", "Fridge", "Washing", "Geyser", "Chimney", "RO"].map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === "all" ? "all" : category.toLowerCase()
                  )
                }
                className={`px-6 py-2 rounded-full ${
                  selectedCategory ===
                  (category === "all" ? "all" : category.toLowerCase())
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50"
                } transition-colors border`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Service Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {visibleServices.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/pexels-deepakchadha-12562603.jpg"
              alt="background pattern"
              layout="fill"
              objectFit="cover"
              className="mix-blend-lighten"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Service</h2>
          <p className="mb-6">
            Need immediate assistance? Call our emergency hotline:
          </p>
          <a
            href="tel:+916375477987"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            +91 63754 77987
          </a>
        </div>
      </div>
    </section>
  );
}
