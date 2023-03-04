const express = require('express');
const cors = require('cors');
const path = require('path');
const eventRouter = require('./routes/event-router');
const reservationRouter = require('./routes/reservation-router');

const app = express();

app.use(cors());
// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use the routes defined in routes folder
app.use('/events', eventRouter);
app.use('/reservations', reservationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
