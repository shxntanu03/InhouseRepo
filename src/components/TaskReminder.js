// TaskReminder.js

// Function to check tasks in local storage and send reminders
export function checkTasksAndSendReminders() {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks);
    // Get current time
    const currentTime = new Date();
  
    // Iterate through tasks
    tasks.forEach(task => {
      // Parse task start time
      const startTime = new Date(`${task.startDate} ${task.startTime}`);
  
      // Calculate time difference in milliseconds
      const timeDiff = startTime.getTime() - currentTime.getTime();
  
      // If time difference is less than 10 minutes (600,000 milliseconds), send reminder
      if (timeDiff > 0 && timeDiff <= 600000) {
        // Send reminder (you can customize this based on your application, e.g., show a notification)
        alert(`Reminder: Task "${task.name}" starts in less than 10 minutes!`);
      }
    });
  }
  