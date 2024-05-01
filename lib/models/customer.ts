import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  clerkId: string;
  name: string;
  email: string;
  orders: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema: Schema = new Schema({
  clerkId: String,
  name: String,
  email: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserCustomer = mongoose.model<ICustomer>("Customer", customerSchema);

export default UserCustomer;
