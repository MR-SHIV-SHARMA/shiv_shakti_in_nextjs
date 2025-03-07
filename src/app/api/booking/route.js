import { connectDB } from "@/app/api/lib/db";
import Booking from "@/app/api/models/Booking";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    
    const newBooking = await Booking.create(data);

    return Response.json({ success: true, message: "Booking Confirmed!", booking: newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    return Response.json({ success: false, message: "Error processing booking" }, { status: 500 });
  }
}
