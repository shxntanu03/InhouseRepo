const express = require('express');
const router = express.Router();
const { 
  generalTaskCollection,
  techTaskCollection,
  otherTaskCollection,
  personalTaskCollection 
} = require('../mongoDB');

router.post('/generalTask', async (req, res) => {
  const {
    taskName,
    startTime,
    endTime,
    date,
    subject,
    batch,
    className,
    description,
    status
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
      status
    },
  ]);

  try {
    res.status(201).json({ message: "Task created successfully", GeneralTask: newTask });
  } catch (error) {
    console.error("General-Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/getGeneralTask', async (req, res) => {
  try {
    const tasks = await generalTaskCollection.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/techTask', async (req, res) => {
  const { taskName, startTime, endTime, startDate, endDate, description, status,taskId} =
    req.body;

  const newTask = await techTaskCollection.insertMany([
    { taskName, startTime, endTime, startDate, endDate, description,status,taskId },
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


router.get('/getTechTask', async (req, res) => {
  try {
    const tasks = await techTaskCollection.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post('/otherTask', async (req, res) => {
  const {
    session,
    startTime,
    endTime,
    startDate,
    endDate,
    subject,
    description,
    status
  } = req.body;

  const newTask = await otherTaskCollection.insertMany([
    { session, startTime, endTime, startDate, endDate, subject, description,status },
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

router.get('/getOtherTask', async (req, res) => {
  try {
    const tasks = await otherTaskCollection.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post('/personalTask', async (req, res) => {
  const { taskName, startTime, endTime, startDate, endDate, description,status } =
    req.body;

  const newTask = await personalTaskCollection.insertMany([
    { taskName, startTime, endTime, startDate, endDate, description ,status},
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

router.get('/getPersonalTask', async (req, res) => {
  try {
    const tasks = await personalTaskCollection.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST endpoint to fetch tasks based on startDate and status
router.post("/viewTasks", async (req, res) => {
    const { startDate, status } = req.body;
  
    try {
      let allTasks = [];
  
      const generalTasks = await generalTaskCollection.find({ startDate, status });
      allTasks = allTasks.concat(generalTasks);
  
      const techTasks = await techTaskCollection.find({ startDate, status });
      allTasks = allTasks.concat(techTasks);
  
      const otherTasks = await otherTaskCollection.find({ startDate, status });
      allTasks = allTasks.concat(otherTasks);
  
      const personalTasks = await personalTaskCollection.find({ startDate, status });
      allTasks = allTasks.concat(personalTasks);
  
      res.status(200).json({ tasks: allTasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Route to handle POST request for updating a task
  router.post('/updateTask', async (req, res) => {
    try {
      const { taskId, status, category } = req.body;
  
      if (!taskId || !status || !category) {
        return res.status(400).json({ error: 'Task ID, status, and category are required.' });
      }
  
      let updatedTask;
  
      switch (category) {
        case 'techTask':
          updatedTask = await techTaskCollection.updateOne({ taskId: taskId }, { $set: { status: status } });
          break;
        case 'otherTask':
          updatedTask = await otherTaskCollection.updateOne({ taskId: taskId }, { $set: { status: status } });
          break;
        case 'personalTask':
          updatedTask = await personalTaskCollection.updateOne({ taskId: taskId }, { $set: { status: status } });
          break;
        case 'generalTask':
          updatedTask = await generalTaskCollection.updateOne({ taskId: taskId }, { $set: { status: status } });
          break;
        default:
          return res.status(400).json({ error: 'Invalid task category.' });
      }
  
      if (updatedTask.nModified === 0) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      return res.status(200).json({ message: 'Task updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

module.exports = router;
