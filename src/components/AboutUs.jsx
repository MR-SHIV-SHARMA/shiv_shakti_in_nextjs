import React from "react";
import {
  FaCheck,
  FaBullseye,
  FaEye,
  FaRegGem,
  FaHeadset,
  FaThumbsUp,
  FaQuoteLeft,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-['Inter']">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative pb-2 font-['Poppins']">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Who We Are
          </span>
          <span className="absolute bottom-0 left-1/2 w-24 h-1 bg-blue-500 transform -translate-x-1/2"></span>
        </h2>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          Your trusted home service partner in Jaipur! We provide high-quality &
          affordable services with certified professionals dedicated to your
          satisfaction.
        </p>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fadeInUp animate-delay-100">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300">
            Since 2020
          </div>
          <h3 className="text-3xl font-bold text-gray-900 font-['Poppins']">
            Our Journey
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Starting with a vision to revolutionize home services in Jaipur,
            we've grown to become the most trusted name in plumbing, electrical
            work, home cleaning, and AC repair. Our certified professionals
            ensure every job meets the highest standards.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <div className="bg-green-100 px-6 py-3 rounded-lg hover:shadow-md transition-shadow duration-300">
              <p className="text-2xl font-bold text-green-600 animate-scaleIn">
                10K+
              </p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="bg-blue-100 px-6 py-3 rounded-lg hover:shadow-md transition-shadow duration-300">
              <p className="text-2xl font-bold text-blue-600 animate-scaleIn">
                200+
              </p>
              <p className="text-sm text-gray-600">Expert Professionals</p>
            </div>
          </div>
        </div>
        <div className="relative group animate-fadeInUp animate-delay-200">
          <img
            src="/pexels-mart-production-7641255.jpg"
            alt="Our Team"
            className="rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300" />
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: FaBullseye,
            title: "Our Mission",
            content:
              "Deliver exceptional home services with unmatched reliability and affordability.",
          },
          {
            icon: FaEye,
            title: "Our Vision",
            content:
              "Lead India's home service industry through innovation and customer-centric solutions.",
          },
          {
            icon: FaRegGem,
            title: "Our Values",
            content:
              "Integrity, Excellence, and Customer Satisfaction guide every action we take.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <item.icon className="w-12 h-12 text-blue-600 mb-6 transition-transform hover:scale-110 duration-300" />
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-['Poppins']">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us? */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl animate-fadeInUp">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Why Choose HomeServe?
          </h3>
          <p className="text-gray-600 text-lg">
            Discover the difference of working with Rajasthan's most trusted
            home service experts
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Verified Experts", icon: FaCheck },
            { title: "Fair Pricing", icon: FaCheck },
            { title: "Instant Booking", icon: FaCheck },
            { title: "24/7 Support", icon: FaHeadset },
            { title: "Quality Guarantee", icon: FaThumbsUp },
            { title: "10K+ Satisfied Clients", icon: FaCheck },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-12 animate-fadeInUp">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Customer Experiences
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our valued customers about their HomeServe journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Outstanding service! The technician arrived promptly and resolved our AC issues efficiently.",
              author: "Rohan Sharma",
              role: "Homeowner",
            },
            {
              quote:
                "Consistently impressed with their professionalism and attention to detail.",
              author: "Priya Mehta",
              role: "Business Owner",
            },
            {
              quote:
                "Best home service provider in Jaipur - highly recommend to everyone!",
              author: "Akash Verma",
              role: "Frequent User",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <FaQuoteLeft className="w-8 h-8 text-blue-600 mb-4 opacity-75 transition-transform group-hover:scale-125 duration-300" />
              <p className="text-gray-600 text-lg mb-6 transform transition-transform group-hover:-translate-y-1">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-semibold text-gray-900">
                  {testimonial.author}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
