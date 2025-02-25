const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const apartmentRoutes = require('./routes/apartment');
const roomRoutes = require('./routes/room');
const itemRoutes = require('./routes/item');

// Route Middlewares
app.use('/api/apartments', apartmentRoutes);
app.use('/api', roomRoutes);  // Rooms are nested within apartments
app.use('/api', itemRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
