const express = require("express");
const cors = require("cors");
const {
  userCollection,
  generalTaskCollection,
  techTaskCollection,
  otherTaskCollection,
  personalTaskCollection,
} = require("./mongoDB");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// Login endpoint

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Logged In successfully!" });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Store the hashed password in the database
    const newUser = await userCollection.insertMany([
      { email, password: hashedPassword },
    ]);

    res
      .status(201)
      .json({ message: "User created successfully", userSchema: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/generalTask", async (req, res) => {
  const {
    taskName,
    startTime,
    endTime,
    date,
    subject,
    batch,
    className,
    description,
  } = req.body;

  const newTask = await generalTaskCollection.insertMany([
    {
      taskName,
      startTime,
      endTime,
      date,
      subject,
      batch,
      className,
      description,
    },
  ]);

  try {
    res
      .status(201)
      .json({ message: "Task created successfully", GeneralTask: newTask });
  } catch (error) {
    console.error("General-Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getGeneralTask", async (req, res) => {
  try {
    // Assuming otherTaskCollection is your MongoDB collection reference
    const tasks = await generalTaskCollection.find({}); // Use find({}) to retrieve all documents
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/techTask", async (req, res) => {
  const { taskName, startTime, endTime, startDate, endDate, description } =
    req.body;

  const newTask = await techTaskCollection.insertMany([
    { taskName, startTime, endTime, startDate, endDate, description },
  ]);

  try {
    res
      .status(201)
      .json({ message: "Task created successfully", TechTask: newTask });
  } catch (error) {
    console.error("Tech-Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getTechTask", async (req, res) => {
  try {
    // Assuming otherTaskCollection is your MongoDB collection reference
    const tasks = await techTaskCollection.find({}); // Use find({}) to retrieve all documents
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/otherTask", async (req, res) => {
  const {
    session,
    startTime,
    endTime,
    startDate,
    endDate,
    subject,
    description,
  } = req.body;

  const newTask = await otherTaskCollection.insertMany([
    { session, startTime, endTime, startDate, endDate, subject, description },
  ]);

  try {
    res
      .status(201)
      .json({ message: "Task created successfully", OtherTask: newTask });
  } catch (error) {
    console.error("Other-Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getOtherTask", async (req, res) => {
  try {
    // Assuming otherTaskCollection is your MongoDB collection reference
    const tasks = await otherTaskCollection.find({}); // Use find({}) to retrieve all documents
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/personalTask", async (req, res) => {
  const { taskName, startTime, endTime, startDate, endDate, description } =
    req.body;

  const newTask = await personalTaskCollection.insertMany([
    { taskName, startTime, endTime, startDate, endDate, description },
  ]);

  try {
    res
      .status(201)
      .json({ message: "Task created successfully", PersonalTask: newTask });
  } catch (error) {
    console.error("Personal-Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getPersonalTask", async (req, res) => {
  try {
    // Assuming otherTaskCollection is your MongoDB collection reference
    const tasks = await personalTaskCollection.find({}); // Use find({}) to retrieve all documents
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Get All Tasks
app.get("/getTasks", async (req, res) => {
  try {
    // Fetch tasks from your MongoDB collections
    const generalTasks = await generalTaskCollection.find();
    const techTasks = await techTaskCollection.find();
    const otherTasks = await otherTaskCollection.find();
    const personalTasks = await personalTaskCollection.find();

    // Combine tasks from all collections
    const tasks = [...generalTasks, ...techTasks, ...otherTasks, ...personalTasks];

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});