require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/omniTask', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/projects', projectsRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});