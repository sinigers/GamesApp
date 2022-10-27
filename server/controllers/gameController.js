const Game = require('../models/gameModel')
const mongoose = require('mongoose')

// get all games
const getGames = async (req, res) => {
  const games = await Game.find({}).sort({createdAt: -1})

  res.status(200).json(games)
}

// get a single game
const getGame = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such game'})
  }

  const game = await Game.findById(id)

  if (!game) {
    return res.status(404).json({error: 'No such game'})
  }

  res.status(200).json(game)
}

// create a new game
const createGame = async (req, res) => {
  const {title, load, reps} = req.body
  
  let emptyFields = []
  // error hander
  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const game = await Game.create({ title, load, reps })
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a game
const deleteGame = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such game'})
  }

  const game = await Game.findOneAndDelete({_id: id})

  if(!game) {
    return res.status(400).json({error: 'No such game'})
  }

  res.status(200).json(game)
}

// update a game
const updateGame = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such game'})
  }

  const game = await Game.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!game) {
    return res.status(400).json({error: 'No such game'})
  }

  res.status(200).json(game)
}

module.exports = {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame
}