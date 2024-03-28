const express = require('express');
const router = express.Router();
const { 
  generalTaskCollection, 
  techTaskCollection, 
  otherTaskCollection, 
  personalTaskCollection 
} = require('../mongoDB');

router.get('/taskCounts', async (req, res) => {
  try {
    const generalCompletedCount = await generalTaskCollection.countDocuments({ status: 'completed' });
    const generalNotCompletedCount = await generalTaskCollection.countDocuments({ status: 'not completed' });
    const generalPartiallyCompletedCount = await generalTaskCollection.countDocuments({ status: 'partially completed' });

    const techCompletedCount = await techTaskCollection.countDocuments({ status: 'completed' });
    const techNotCompletedCount = await techTaskCollection.countDocuments({ status: 'not completed' });
    const techPartiallyCompletedCount = await techTaskCollection.countDocuments({ status: 'partially completed' });

    const otherCompletedCount = await otherTaskCollection.countDocuments({ status: 'completed' });
    const otherNotCompletedCount = await otherTaskCollection.countDocuments({ status: 'not completed' });
    const otherPartiallyCompletedCount = await otherTaskCollection.countDocuments({ status: 'partially completed' });

    const personalCompletedCount = await personalTaskCollection.countDocuments({ status: 'completed' });
    const personalNotCompletedCount = await personalTaskCollection.countDocuments({ status: 'not completed' });
    const personalPartiallyCompletedCount = await personalTaskCollection.countDocuments({ status: 'partially completed' });

    res.json({ 
      general: {
        completed: generalCompletedCount,
        notCompleted: generalNotCompletedCount,
        partiallyCompleted: generalPartiallyCompletedCount
      },
      tech: {
        completed: techCompletedCount,
        notCompleted: techNotCompletedCount,
        partiallyCompleted: techPartiallyCompletedCount
      },
      other: {
        completed: otherCompletedCount,
        notCompleted: otherNotCompletedCount,
        partiallyCompleted: otherPartiallyCompletedCount
      },
      personal: {
        completed: personalCompletedCount,
        notCompleted: personalNotCompletedCount,
        partiallyCompleted: personalPartiallyCompletedCount
      }
    });
  } catch (error) {
    console.error("Error fetching task counts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
