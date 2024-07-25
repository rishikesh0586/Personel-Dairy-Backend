const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address:String,
    city: String,
    state: String,
    country: String,
    pinCode:Number,
    phoneNo:Number,
  },
  orderItems: [
    {
      name:  String,
      price:  Number,
      quantity: Number,
      image: String,
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: String,
    status:  String,
  },
  paidAt: Date,
  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;

// orderModel vo hai jispe mongodb query lagayenge 
//and 'order' nam ka collection bn jayega  