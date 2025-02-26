const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

const apartmentRoutes = require('./routes/apartment');
const roomRoutes = require('./routes/room');
const itemRoutes = require('./routes/item');

// Route Middlewares
app.use('/api/apartments', apartmentRoutes);
app.use('/api/apartments', roomRoutes);  // Rooms are nested within apartments
app.use('/api/apartments', itemRoutes)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
