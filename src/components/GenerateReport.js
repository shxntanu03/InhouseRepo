import React, { useState } from 'react';
import './GenerateReport.css';

const GenerateReport = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedTask, setSelectedTask] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customDate, setCustomDate] = useState(false);

  const handleGenerateReport = () => {
    // Implement report generation logic here
    console.log('Generating report...');
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedMonth(''); // Reset selected month
    setSelectedWeek(''); // Reset selected week
    if (date === 'custom') {
      setCustomDate(true);
    } else {
      setCustomDate(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  return (
    <div className="generate-report-container">
    <div className="heading"> 
    <h2>Generate Report</h2>
    </div>
     
      <div className="filters-container">
        <div className="filter">
          <label>Select Date:</label>
          <select value={selectedDate} onChange={handleDateChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom Date</option>
          </select>
          {selectedDate === 'monthly' && (
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          )}
          {selectedDate === 'weekly' && (
            <select value={selectedWeek} onChange={handleWeekChange}>
              <option value="">Select Week</option>
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
              <option value="week4">Week 4</option>
            </select>
          )}
          {customDate && (
            <div className="custom-date-fields">
              {/* <label>Start Date</label> */}
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

              {/* <label>End Date</label> */}
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          )}
        </div>
        <div className="filter">
          <label>Select Task:</label>
          <select value={selectedTask} onChange={handleTaskChange}>
            <option value="all">All</option>
            <option value="personal">Personal Task</option>
            <option value="general">General Task</option>
            <option value="technical">Technical Task</option>
            <option value="other">Other Task</option>
          </select>
        </div>
      </div>
      <button onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
};

export default GenerateReport;
