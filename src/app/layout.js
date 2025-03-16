"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import QueryProvider from "@/components/QueryProvider";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.shivshaktiss.in/" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur" />
        <meta name="geo.position" content="26.9124;75.7873" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Navbar />
          {children}

          {/* Phone Icon - Left Side */}
          <div className="fixed bottom-5 left-5 z-50">
            <a
              href="tel:+916375477987"
              className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
              <FaPhoneAlt size={26} />
            </a>
          </div>

          {/* WhatsApp Icon - Right Side */}
          <div className="fixed bottom-5 right-5 z-50">
            <a
              href="https://wa.link/hk9jgm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            >
              <FaWhatsapp size={26} />
            </a>
          </div>

          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
