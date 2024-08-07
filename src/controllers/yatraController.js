import Yatra from "../models/master/yatraModel.js";

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
    const yatra = await Yatra.findById({ id });
    return res.json({
      success: true,
      message: " Yatras fetched successfully!",
      yatra: yatra,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get the yatra." });
  }
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

    // Validate nested fields within yatraInfo
    const yatraInfoFields = [
      "overview",
      "bestTimeToVisit",
      "travelArrangements",
      "accommodation",
      "travelTips",
      "packing",
    ];
    
    if (data.yatraInfo && data.yatraInfo.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Missing all yatraInfo field`,
      });
    }

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
