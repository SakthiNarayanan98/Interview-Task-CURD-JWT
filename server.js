const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);

// database connection
sequelize
  .authenticate()
  .then(() => console.log('MySQL connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
