import { connectDB } from "@/app/api/lib/db";
import Booking from "@/app/api/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    let body = await req.json();

    // Fix appointmentDate format before saving
    if (body.appointmentDate) {
      body.appointmentDate = new Date(body.appointmentDate);
    }

    const newBooking = new Booking(body);
    await newBooking.save();

    return NextResponse.json({ message: "Booking Successful!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error booking service", error }, { status: 500 });
  }
}
