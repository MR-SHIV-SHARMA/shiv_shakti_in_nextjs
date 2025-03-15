import { connectDB } from "@/app/api/lib/db";
import Service from "@/app/api/models/ServiceDetails";

// GET Method - सभी Services प्राप्त करें
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    return Response.json({ success: true, data: services }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching services", error },
      { status: 500 }
    );
  }
}

// POST Method - नई Service जोड़ें
export async function POST(req) {
  try {
    await connectDB();
    const { name, title, description, price, icon } = await req.json();

    if (!name || !title || !description || !price || !icon) {
      return Response.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newService = new Service({ name, title, description, price, icon });
    await newService.save();

    return Response.json(
      {
        success: true,
        message: "Service added successfully",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error adding service", error },
      { status: 500 }
    );
  }
}
