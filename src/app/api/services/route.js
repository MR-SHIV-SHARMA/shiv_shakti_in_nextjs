import { connectDB } from "@/app/api/lib/db";
import Service from "@/app/api/models/ServiceDetails";

// ✅ GET Method
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

// ✅ POST Method
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

    const defaultPrice = {
      installation: { cost: 0, details: [] },
      service: { cost: 0, details: [] },
      repair: { cost: 0, details: [] },
    };

    const finalPrice = { ...defaultPrice, ...price };

    const newService = new Service({
      name,
      title,
      description,
      price: finalPrice,
      icon,
    });
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

// ✅ PATCH Method
export async function PATCH(req) {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();

    if (!id) {
      return Response.json(
        { success: false, message: "Service ID is required." },
        { status: 400 }
      );
    }

    const updatedService = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return Response.json(
        { success: false, message: "Service not found." },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Service updated successfully",
        data: updatedService,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error updating service", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE Method
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { success: false, message: "Service ID is required." },
        { status: 400 }
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return Response.json(
        { success: false, message: "Service not found." },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Service deleted successfully",
        data: deletedService,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error deleting service", error },
      { status: 500 }
    );
  }
}
