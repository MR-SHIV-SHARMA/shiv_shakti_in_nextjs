"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTv } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine } from "react-icons/gi";
import Link from "next/link";
import Head from "next/head";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  const [services, setServices] = useState([]); // Services को स्टेट में स्टोर करने के लिए

  // API से डेटा लाने के लिए useEffect का उपयोग
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services"); // API कॉल
        if (response.data.success) {
          setServices(response.data.data); // सर्विस डेटा स्टेट में सेट करो
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices(); // फंक्शन को कॉल करो
  }, []);

  return (
    <div className="overflow-hidden">
      {/* SEO Meta Tags */}
      <Head>
        <title>
          Shiv Shakti Home Appliance Services - Repair & Installation
        </title>
        <meta
          name="description"
          content="Get the best home appliance repair and installation services in your city. We specialize in AC, Refrigerator, Washing Machine, Microwave Oven, and more."
        />
        <meta
          name="keywords"
          content="Home Appliance Repair, AC Service, Refrigerator Repair, Washing Machine Repair, Electrician Services"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-black text-yellow-500 w-full h-auto pt-8">
        {/* Top Section - Logo and Business Name */}
        <div className="sm:absolute flex justify-between sm:justify-start sm:w-1/2 items-center sm:items-start px-4 bg-black">
          <div className="w-1/2 sm:w-auto flex justify-center px-4 mr-4">
            <div className="border-4 border-yellow-500 rounded-lg p-2">
              <img
                src="/logo.jpeg"
                alt="Shiv Shakti Home Appliance Services Logo"
                className="w-24 sm:w-32 h-24 sm:h-32"
              />
            </div>
          </div>

          <div className="w-1/2 sm:w-auto text-left">
            <h1 className="text-2xl font-bold">
              Shiv Shakti Home Appliance Services
            </h1>
            <p className="text-lg font-semibold mt-2 hidden sm:block">
              Contact No: 6375477987
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold mt-2 px-4 sm:hidden">
          Contact No: 6375477987
        </p>

        {/* Middle Section - Appliance Images */}
        <div className="flex justify-end items-end w-[100%] sm:w-[75%] right-0 mt-6 bg-yellow-500 rounded-tl-full overflow-hidden relative ml-auto">
          <div className="w-full h-full bg-yellow-500">
            <img
              src="/b.png"
              alt="Shiv Shakti Appliance Repair Service"
              className="w-[80%] h-full sm:hidden ml-auto"
            />
            <img
              src="/1.png"
              alt="Expert Home Appliance Repair Technicians"
              className="w-full h-full object-cover hidden sm:block"
            />
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="w-full mt-1"></div>

        {/* Bottom Section - Services */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center pt-6 pb-6 px-4 bg-yellow-500">
          {services.length > 0 ? (
            services.map((service) => (
              <Link
                key={service._id}
                href={`/service/${service._id}`}
                className="relative border-2 border-black p-2 block 
                 transition-all duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-lg 
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                 group"
                aria-label={`View ${service.name} service`}
              >
                <span
                  className="absolute top-0 left-4 sm:left-12 right-4 sm:right-12 h-[6px] bg-black rounded-br-2xl rounded-bl-2xl 
                      transition-all duration-300 group-hover:w-[90%] group-hover:left-[5%]"
                />
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {service.icon === "tv" && (
                    <FaTv
                      size={40}
                      className="w-16 sm:w-32 h-16 sm:h-32 mx-auto mt-4 text-black"
                    />
                  )}
                  {service.icon === "ac" && (
                    <TbAirConditioning
                      size={40}
                      className="w-16 sm:w-32 h-16 sm:h-32 mx-auto mt-4 text-black"
                    />
                  )}
                  {service.icon === "refrigerator" && (
                    <CgSmartHomeRefrigerator
                      size={40}
                      className="w-16 sm:w-32 h-16 sm:h-32 mx-auto mt-4 text-black"
                    />
                  )}
                  {service.icon === "washing-machine" && (
                    <GiWashingMachine
                      size={40}
                      className="w-16 sm:w-32 h-16 sm:h-32 mx-auto mt-4 text-black"
                    />
                  )}
                  {!["tv", "ac", "refrigerator", "washing-machine"].includes(
                    service.icon
                  ) && (
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-16 sm:w-32 h-16 sm:h-32 mx-auto mt-4"
                    />
                  )}
                </div>
                <p
                  className="mt-2 font-semibold text-black 
                   transition-colors duration-300 group-hover:text-gray-800
                   text-sm sm:text-base"
                >
                  {service.name}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-black font-semibold text-lg col-span-2 md:col-span-3">
              Loading services...
            </p>
          )}
        </div>
      </section>

      {/* WhyChooseUs Section */}
      <WhyChooseUs />
    </div>
  );
}
