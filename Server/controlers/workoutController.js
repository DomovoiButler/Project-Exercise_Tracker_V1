const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//Get all workouts
const getWorkOuts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//Get one workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//Create new workout
const createWorkout = async (req, res) => {

    const {muscle, title, sets, reps, exp} = req.body

    let emptyFields = []

    if(!muscle) {
        emptyFields.push('muscle')
    }
    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try{
        const workout = await Workout.create({muscle, title, sets, reps, exp})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//Delete workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.satus(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//Update workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.satus(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkOuts,
    deleteWorkout,
    updateWorkout
}