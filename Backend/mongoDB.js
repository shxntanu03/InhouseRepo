const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TaskManagement")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const generalTaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  startTime: {
    type: String, // Use String type for time in HH:MM:AM/PM format
    required: true
  },
  endTime: {
    type: String, // Use String type for time in HH:MM:AM/PM format
    required: true
  },
  date: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const techTaskSchema = new mongoose.Schema({
    taskName: {
      type: String,
      required: true
    },
    startTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    endTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    }
  });

  const otherTaskSchema = new mongoose.Schema({
    session: {
      type: String,
      required: true
    },
    startTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    endTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
        type: String,
        required: true
    },
    subject:{
        type:String,
        required:true
    },
    description: {
      type: String,
      required: true
    }
  });

  const personalTaskSchema = new mongoose.Schema({
    taskName: {
      type: String,
      required: true
    },
    startTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    endTime: {
      type: String, // Use String type for time in HH:MM:AM/PM format
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    }
  });

const userCollection = mongoose.model("User", userSchema); // Changed collection name to "User" (capitalized)
const generalTaskCollection = mongoose.model("GeneralTask", generalTaskSchema);
const techTaskCollection = mongoose.model("TechTask", techTaskSchema);
const otherTaskCollection = mongoose.model("OtherTask", otherTaskSchema);
const personalTaskCollection = mongoose.model("PersonalTask", personalTaskSchema); // Changed collection name to "GeneralTask" (capitalized)

module.exports = { userCollection, generalTaskCollection, techTaskCollection, otherTaskCollection, personalTaskCollection };
