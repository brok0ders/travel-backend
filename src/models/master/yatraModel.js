import mongoose, { Schema } from "mongoose";

// Define the schema for the Yatra model
const YatraSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  days: {
    type: Number,
    require: true,
  },
  nights: {
    type: Number,
    require: true,
  },
  totalDistance: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  seats: {
    September: {
      type: Map,
      of: Number,
      default: {},
    },
    October: {
      type: Map,
      of: Number,
      default: {},
    },
    March: {
      type: Map,
      of: Number,
      default: {},
    },
    April: {
      type: Map,
      of: Number,
      default: {},
    },
  },

  highlights: [String],

  placesToVisit: [
    {
      place: {
        type: String,
        require: true,
      },
      time: {
        type: String,
        require: true,
      },
      distance: {
        type: Number,
        require: true,
      },
    },
  ],

  videos: [
    {
      link: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  exclusion: [String],
  inclusion: [String],
  blogs: [
    {
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
    },
  ],
  seasonData: [
    {
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
      weather: {
        type: String,
        required: true,
      },
      routeConditions: {
        type: String,
        required: true,
      },
      advantages: {
        type: String,
        required: true,
      },
    },
  ],
  yatraInfo: {
    overview: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    bestTimeToVisit: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    travelArrangements: {
      title: {
        type: String,
        required: true,
      },
      content: [String], // An array of strings
    },
    accommodation: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    travelTips: {
      title: {
        type: String,
        required: true,
      },
      content: [String], // An array of strings
    },
    packing: {
      title: {
        type: String,
        required: true,
      },
      content: [String], // An array of strings
    },
  },
});

// Create the model
const Yatra = mongoose.model("Yatra", YatraSchema);

export default Yatra;
