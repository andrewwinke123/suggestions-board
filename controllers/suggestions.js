import { Suggestion } from "../models/suggestion.js"


function index(req, res) {
  Suggestion.find({})
  .populate('owner')
  .then(suggestions => {
    console.log(suggestions),
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
  .populate([
    {path: 'owner'},
    {path: 'comments.author'}
  ])
  .then(suggestion => {
    res.render('suggestions/show', {
      title: 'suggestion show',
      suggestion
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
  console.log("OVER HERE THISTIME", req.params.suggestionId)
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    console.log("HERE!!!", suggestion)
    if (suggestion.owner.equals(req.user.profile._id)) {
      req.body.passive = !!req.body.passive
      suggestion.updateOne(req.body)
      .then(()=> {
        res.redirect(`/suggestions/${suggestion._id}`)
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


function passive(req, res) {
  Suggestion.find({})
  .populate('owner')
  .then(suggestions => {
    res.render('suggestions/passive', {
      suggestions,
      title: 'Passive'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function aggressive(req, res) {
  Suggestion.find({})
  .populate('owner')
  .then(suggestions => {
    res.render('suggestions/aggressive', {
      suggestions,
      title: 'Aggressive'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addComment(req, res) {
  Suggestion.findById(req.params.suggestionId)
  .then(suggestion => {
    console.log('!!!!!!!!!LOOK OVER HERE!!!!!!!!')
    req.body.author = req.user.profile._id
    suggestion.comments.push(req.body)
    suggestion.save()
    .then(()=> {
      res.redirect(`/suggestions/${suggestion._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/suggestions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/suggestions')
  })
}

// function editComment(req, res) {
//   Suggestion.findById(req.params.suggestionId)
//   .then(suggestion => {
//     console.log(suggestion.comments)
//     const comment = suggestion.comments.id(req.params.commentId);
//     console.log('LOOK OVER HERE!!',comment)
//     if (comment.author.equals(req.user.profile._id)) {
//       res.render('suggestions/editComment', {
//         suggestion,
//         comment,
//         title: 'Update Comment'
//       })
//     } else {
//       throw new Error('🚫 Not authorized 🚫')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/suggestion')
//   })
// }






export {
  index,
  create,
  show,
  flipPassively,
  edit,
  update,
  deleteSuggestion,
  passive,
  aggressive,
  addComment,
  // editComment
}