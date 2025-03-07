import { connectDB } from "@/app/api/lib/db";
import Booking from "@/app/api/models/Booking";
import { NextResponse } from "next/server";

// 🟢 CREATE Booking (POST)
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

// 🟡 GET All Bookings
export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching bookings" }, { status: 500 });
  }
}

// 🔵 UPDATE Booking (PATCH)
export async function PATCH(req) {
  try {
    await connectDB();
    const { _id, ...updates } = await req.json(); // _id se identify karna h booking

    if (!_id) {
      return NextResponse.json({ success: false, message: "Booking ID required" }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(_id, updates, { new: true });

    if (!updatedBooking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking Updated", booking: updatedBooking });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating booking", error }, { status: 500 });
  }
}

// 🔴 DELETE Booking (DELETE)
export async function DELETE(req) {
  try {
    await connectDB();
    const { _id } = await req.json(); // Frontend se _id bhejna hoga

    if (!_id) {
      return NextResponse.json({ success: false, message: "Booking ID required" }, { status: 400 });
    }

    const deletedBooking = await Booking.findByIdAndDelete(_id);

    if (!deletedBooking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting booking", error }, { status: 500 });
  }
}
