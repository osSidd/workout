require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const workoutRoutes = require('./routes/workout');

//middleware
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.method, req.path);
    next();
});

//routes
app.use('/api/workouts', workoutRoutes);

//db connection and starting server
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on('open', () => {
    app.listen(process.env.PORT, () => {
        console.log('db connected & listening on port '+ process.env.PORT);
    });    
});

db.on('error', err =>  console.error.bind(console, err.message));
