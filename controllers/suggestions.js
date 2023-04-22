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


export {
  index,
  create,
}