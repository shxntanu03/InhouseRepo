const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const exportRoutes = require('./routes/exportRoutes');


const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', exportRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
