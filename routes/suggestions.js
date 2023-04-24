import { Router } from 'express'
import * as suggestionsCtrl from '../controllers/suggestions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/suggestions
router.get('/', suggestionsCtrl.index)

// POST localhost:3000/suggestions
router.post('/', isLoggedIn, suggestionsCtrl.create)





router.get('/passive', suggestionsCtrl.index)

// GET localhost:3000/suggestions/suggestionId
router.get('/:suggestionId', suggestionsCtrl.show)

// PATCH localhost:3000/suggestions/suggestionId
router.patch('/:suggestionId/flip-passive', isLoggedIn, suggestionsCtrl.flipPassively)

// GET localhost:3000/suggestions/:suggestionId/edit
router.get('/:suggestionId/edit', isLoggedIn, suggestionsCtrl.edit)

// PUT localhost:3000/suggestions/:suggestionId
router.put('/:suggestioId', isLoggedIn, suggestionsCtrl.update)

// DELETE localhost:3000/suggestions/:suggestionId
router.delete('/:suggestionId', isLoggedIn, suggestionsCtrl.deleteSuggestion)




export {
  router
}