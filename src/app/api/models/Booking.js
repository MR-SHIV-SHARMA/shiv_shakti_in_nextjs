import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: [String], required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  address: {
    houseNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  paymentMethod: { type: String, default: "Cash on Service" },
  advancePaid: { type: Number, default: 0 },
  status: { type: String, default: "Pending" }, // Pending, In Progress, Completed
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
