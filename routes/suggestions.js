import { Router } from 'express'
import * as suggestionsCtrl from '../controllers/suggestions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/suggestions
router.get('/', suggestionsCtrl.index)

// GET localhost:3000/suggestions/passive
router.get('/passive', suggestionsCtrl.passive)

// GET localhost:3000/suggestions/aggressive
router.get('/aggressive', suggestionsCtrl.aggressive)

// POST localhost:3000/suggestions
router.post('/', isLoggedIn, suggestionsCtrl.create)

router.get('/passive', suggestionsCtrl.index)

// GET localhost:3000/suggestions/suggestionId
router.get('/:suggestionId', suggestionsCtrl.show)

// PATCH localhost:3000/suggestions/suggestionId
router.patch('/:suggestionId/flip-passive', isLoggedIn, suggestionsCtrl.flipPassively)

// POST localhost:3000/suggestions/suggestionId/comments
router.post('/:suggestionId/comments', isLoggedIn, suggestionsCtrl.addComment)

// DELETE localhost:3000/
router.delete('/:suggestionId/comments/:commentId', isLoggedIn, suggestionsCtrl.deleteComment)
,
// GET localhost:3000/suggestions/:suggestionId/edit
router.get('/:suggestionId/edit', isLoggedIn, suggestionsCtrl.edit)

// PUT localhost:3000/suggestions/:suggestionId
router.put('/:suggestionId', isLoggedIn, suggestionsCtrl.update)

// DELETE localhost:3000/suggestions/:suggestionId
router.delete('/:suggestionId', isLoggedIn, suggestionsCtrl.deleteSuggestion)




export {
  router
}