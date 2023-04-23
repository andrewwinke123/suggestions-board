import { Suggestion } from "../models/suggestion.js"


function index(req, res) {
  Suggestion.find({})
  .then(suggestions => {
    res.render('suggestions/index', {
      suggestions,
      title: 'test'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.passive = !!req.body.passive
  Suggestion.create(req.body)
  .then(suggestion => {
    res.redirect('/suggestions')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}

function show(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .populate('owner')
  .then(suggestion => {
    res.render('suggestions/show', {
      suggestion,
      title: 'suggestion show'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}

function flipPassively(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    suggestion.passive = !suggestion.passive
    suggestion.save()
    .then(()=> {
      res.redirect('/suggestions/${suggestion._id')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}


function edit(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    res.render('suggestions/edit', {
      suggestion,
      title:'edit 🏗️'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}



export {
  index,
  create,
  show,
  flipPassively,
  edit,
}