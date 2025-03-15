import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  cost: { type: Number, required: true },
  details: { type: [String], required: true },
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Map,
    of: PriceSchema, // Allows both single & multiple pricing types
    required: true,
  },
  icon: { type: String, required: true },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
