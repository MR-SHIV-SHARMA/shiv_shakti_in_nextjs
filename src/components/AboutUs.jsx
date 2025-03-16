// components/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-6xl mx-auto p-6 text-center md:text-left space-y-12">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-700">Who We Are</h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Your trusted **home service partner in Jaipur**! We provide
          **high-quality** & **affordable** services with the best
          professionals.
        </p>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-blue-500">Our Story</h3>
          <p className="text-gray-600">
            Founded in **2020**, we started with a vision to **simplify home
            services** for Jaipur residents. From **plumbing, electrical work,
            home cleaning, AC repair, and much more**, we provide **trusted
            professionals** at your doorstep.
          </p>
          <p className="text-gray-600">
            With **10,000+ happy customers**, we are growing every day to make
            home maintenance **hassle-free & affordable**.
          </p>
        </div>
        <img
          src="/pexels-mart-production-7641255.jpg"
          alt="About Us"
          className="rounded-lg shadow-lg w-full"
        />
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">Our Mission</h3>
          <p className="text-gray-600 mt-2">
            To provide **easy, fast, and affordable home services** while
            ensuring customer satisfaction and trust.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">Our Vision</h3>
          <p className="text-gray-600 mt-2">
            To be India’s **#1 home service provider**, creating a hassle-free
            experience with professional experts.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">
            Our Core Values
          </h3>
          <p className="text-gray-600 mt-2">
            ✅ **Customer First** - Your satisfaction is our priority. ✅
            **Quality Service** - Best professionals, top-notch work. ✅
            **Transparency** - No hidden charges, fair pricing.
          </p>
        </div>
      </div>

      {/* Why Choose Us? */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Why Choose Us?
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ Verified Experts
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              100% background-checked professionals.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ Affordable Pricing
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Best services at competitive rates.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ Easy Online Booking
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Book services in just a few clicks.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ 24/7 Customer Support
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              We are here for you anytime.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ Quality Guarantee
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Satisfaction guaranteed or money back.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-blue-500">
              ✔ Trusted by 10K+ Customers
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Join our happy customer community.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">
          What Our Customers Say
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              "Amazing service! The electrician was professional and solved my
              issue quickly."
            </p>
            <h4 className="text-blue-500 font-semibold mt-2">— Rohan Sharma</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              "Fast booking, excellent cleaning service! Highly recommend."
            </p>
            <h4 className="text-blue-500 font-semibold mt-2">— Priya Mehta</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              "Best home service in Jaipur. They are professional and
              affordable!"
            </p>
            <h4 className="text-blue-500 font-semibold mt-2">— Akash Verma</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
