// products.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerClerkId: string;
  products: {
    product: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  shippingAddress: string;
  shippingRate: string;
  totalAmount: number;
}

const orderSchema: Schema = new Schema({
  customerClerkId: { type: String, required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    color: String,
    size: String,
    quantity: Number
  }],
  shippingAddress: { type: String, required: true },
  shippingRate: { type: String, required: true },
  totalAmount: { type: Number, required: true }
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
