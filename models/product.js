const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  platform: {
    required: true,
    type: String
  },
  category: {
    required: true,
    type: String
  },
  thumbnail: {
    required: true,
    type: String
  },
  previewImages: [{
    required: true,
    type: String
  }],
  coverImage: {
    required: true,
    type: String
  },
  developer: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  minReq: {
    ram: {
      type: String,
      required: true
    },
    cpu: {
      type: String,
      required: true
    },
    graphicsCard: {
      type: String,
      required: true
    },
    storage: {
      type: String,
      required: true
    },
    os: {
      type: String,
      required: true
    }
  },
  recomReq: {
    ram: {
      type: String,
      required: true
    },
    cpu: {
      type: String,
      required: true
    },
    graphicsCard: {
      type: String,
      required: true
    },
    storage: {
      type: String,
      required: true
    },
    os: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  keyFeatures: [{
    type: String,
    required: true
  }],
  reviews: [{
    rating:String,
    text:String,
    by:{
      type: ObjectId,
      ref: "User"
  }
}]


},{timestamps:true})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;