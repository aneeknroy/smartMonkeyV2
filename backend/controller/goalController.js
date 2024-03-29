const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400) // 400 status means error
        throw new Error('Please add a Text Field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })


    res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT /api/goal/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true, })

    res.status(200).json(updatedGoal)
})

// @desc    Delete goals
// @route   DELETE /api/goal/:id
// @access  private
const deleteGoal = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    await goal.deleteOne()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}