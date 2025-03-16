"use client";
import Admin from "@/components/Admin";
import ServicesDetailsAdmin from "@/components/ServicesDetailsAdmin";
import Logout from "@/components/Logout";

export default function AdminPanel() {
  return (
    <>
      <Logout />
      <Admin />
      <ServicesDetailsAdmin />
    </>
  );
}
