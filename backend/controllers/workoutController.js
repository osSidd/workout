const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

//get all workouts
exports.getWorkouts = async(req,res,next) => {
    try{
        const workout = await Workout.find({}).sort({createdAt : -1})
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

//post a new workout
exports.createWorkout =  async (req,res,next) => {
    const {title, reps, load} = req.body;
    console.log(req.body);
    try{
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

//get a single workout
exports.getWorkout = async (req,res,next) => {
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error: "No such workout"});
        }
        const workout = await Workout.findById(id)

        if(!workout)
            return res.status(404).json({error: "Workout not found"})
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//delete a workout
exports.deleteWorkout = async (req,res,next) => {
    try{
        const id = req.params.id;
       
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error: "No such workout due to bad id"});
        }
       
        const workout = await Workout.findByIdAndDelete({_id: id})

        if(!workout)
            return res.status(404).json({error: "Workout not found"})
       
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//update a workout
exports.updateWorkout = async (req,res,next) => {
    try{
        const id = req.params.id;
       
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error: "No such workout"});
        }
       
        const workout = await Workout.findByIdAndUpdate({_id: id},{
            ...req.body,
        })

        if(!workout)
            return res.status(404).json({error: "Workout not found"})
       
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}