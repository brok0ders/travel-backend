import mongoose from "mongoose";
import Blog from "../models/master/blogModel.js";
import Yatra from "../models/yatraModel.js";

const getAllYatras = async (req, res) => {
  try {
    const yatras = await Yatra.find();
    return res.json({
      success: true,
      message: " Yatras fetched successfully!",
      yatra: yatras,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get all yatras." });
  }
};

const getYatraById = async (req, res) => {
  try {
    const { id } = req.params;

    // Using aggregation pipeline to populate the blogs field
    const yatra = await Yatra.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }, // Use `new` keyword with `ObjectId`
      },
      {
        $lookup: {
          from: "blogs", // The name of the Blog collection
          localField: "blogs", // The field in Yatra that contains the blog IDs
          foreignField: "_id", // The field in Blog collection that matches the blog IDs
          as: "blogs", // The field in Yatra where the populated blogs will be stored
        },
      },
    ]);

    if (yatra.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Yatra not found.",
      });
    }


    return res.json({
      success: true,
      message: "Yatra fetched successfully!",
      yatra: yatra[0], // Since aggregate returns an array, get the first element
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to get the Yatra." });
  }
};


// creating blogs
const handleBlogs = async (blogsData) => {
  const blogs = [];

  for (let blog of blogsData) {
    let b = await Blog.findOne({ title: blog.title });

    if (!b) {
      b = await Blog.create(blog);
    }

    blogs.push(b._id); // Push the _id of the found or created blog
  }

  return blogs;
};

const createYatra = async (req, res) => {
  try {
    const data = req.body;
    const requiredFields = [
      "name",
      "price",
      "from",
      "to",
      "days",
      "nights",
      "totalDistance",
      "imageUrl",
      "description",
      "seats",
      "highlights",
      "placesToVisit",
      "videos",
      "exclusion",
      "inclusion",
      "blogs",
      "seasonData",
      "yatraInfo",
    ];

    // Check if all required fields are present in req.body
    for (const field of requiredFields) {
      if (!(field in data)) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    if (data.yatraInfo && data.yatraInfo.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Missing all yatraInfo field`,
      });
    }

    data.blogs = await handleBlogs(data.blogs);

    console.log("creating>>>");
    const yatra = await Yatra.create(data);
    console.log("done...");
    return res.status(201).json({
      success: true,
      message: "Yatra created successfully!",
      yatra: yatra,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create the yatra." });
  }
};

const updateYatra = async (req, res) => {
  try {
    const yatraId = req.params.id; // Assuming the Yatra ID is passed as a URL parameter
    const updates = req.body;

    // Validate that the updates are not empty
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update fields provided.",
      });
    }

    // Validate that required fields within yatraInfo are present if updating
    const yatraInfoFields = [
      "overview",
      "bestTimeToVisit",
      "travelArrangements",
      "accommodation",
      "travelTips",
      "packing",
    ];
    for (const field of yatraInfoFields) {
      if (updates.yatraInfo && updates.yatraInfo[field]) {
        if (
          !updates.yatraInfo[field].title ||
          !updates.yatraInfo[field].content
        ) {
          return res.status(400).json({
            success: false,
            message: `Missing title or content in yatraInfo field: ${field}`,
          });
        }
      }
    }

    // Update the Yatra document
    const updatedYatra = await Yatra.findByIdAndUpdate(yatraId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedYatra) {
      return res.status(404).json({
        success: false,
        message: "Yatra not found.",
      });
    }

    return res.json({
      success: true,
      message: "Yatra updated successfully!",
      yatra: updatedYatra,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update the yatra.",
      error: error.message,
    });
  }
};

const deleteYatra = async (req, res) => {
  try {
    const yatraId = req.params.id; // Assuming the Yatra ID is passed as a URL parameter

    // Delete the Yatra document
    const deletedYatra = await Yatra.findByIdAndDelete(yatraId);

    if (!deletedYatra) {
      return res.status(404).json({
        success: false,
        message: "Yatra not found.",
      });
    }

    return res.json({
      success: true,
      message: "Yatra deleted successfully!",
      yatra: deletedYatra,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the yatra.",
      error: error.message,
    });
  }
};

export { getAllYatras, getYatraById, createYatra, updateYatra, deleteYatra };
