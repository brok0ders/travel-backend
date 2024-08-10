import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
