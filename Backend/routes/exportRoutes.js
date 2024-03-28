const express = require('express');
const router = express.Router();
const excelJs = require('exceljs');
const {
  generalTaskCollection,
  techTaskCollection,
  otherTaskCollection,
  personalTaskCollection
} = require('../mongoDB');

router.get('/exportToExcel/:taskType', async (req, res) => {
  const taskType = req.params.taskType;
  let tasks;

  try {
    switch (taskType) {
      case 'generalTask':
        tasks = await generalTaskCollection.find({});
        break;
      case 'techTask':
        tasks = await techTaskCollection.find({});
        break;
      case 'otherTask':
        tasks = await otherTaskCollection.find({});
        break;
      case 'personalTask':
        tasks = await personalTaskCollection.find({});
        break;
      default:
        return res.status(400).json({ message: 'Invalid task type' });
    }

    const wb = new excelJs.Workbook();
    const ws = wb.addWorksheet("Tasks");

    ws.columns = [
      { header: "S no", key: "sr_no" },
      { header: "Task Name", key: "taskName" },
      { header: "Description", key: "description" },
      { header: "Start Time", key: "startTime" },
      { header: "End Time", key: "endTime" },
      { header: "Status", key: "status" }
    ];

    let counter = 1;

    tasks.forEach((task) => {
      task.sr_no = counter;
      ws.addRow(task);
      counter++;
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${taskType}_tasks.xlsx`);

    await wb.xlsx.write(res);
  } catch (error) {
    console.error("Error exporting tasks to Excel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
