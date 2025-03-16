import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  cost: { type: Number, default: 0 },
  details: { type: [String], default: [] },
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Map,
    of: PriceSchema,
    default: {},
  },
  icon: { type: String, required: true },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
