import { Suggestion } from "../models/suggestion.js"


function index(req, res) {
  Suggestion.find({})
  .populate('owner')
  .then(suggestions => {
    console.log(suggestions)
    res.render('suggestions/index', {
      suggestions,
      title: 'Suggestions?'
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
    res.redirect('/')
  })
}

function update(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    if (suggestion.owner.equals(req.user.profile._id)) {
      req.body.passive = !!req.body.passive
      suggestion.updateOne(req.body)
      .then(()=> {
        res.redirect(`/suggections/${suggestion._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}

function deleteSuggestion(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    if (suggestion.owner.equals(req.user.profile._id)) {
      suggestion.deleteOne()
      .then(() => {
        res.redirect('/suggestions')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
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
  update,
  deleteSuggestion
}