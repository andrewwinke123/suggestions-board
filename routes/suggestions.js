import { Router } from 'express'
import * as suggestionsCtrl from '../controllers/suggestions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/suggestions
router.get('/', suggestionsCtrl.index)

// POST localhost:3000/suggestions
router.post('/', isLoggedIn, suggestionsCtrl.create)

// GET localhost:3000/suggestions/suggestionId
router.get('/:suggestionId', suggestionsCtrl.show)

// PATCH localhost:3000/suggestions/suggestionId
router.patch('/:suggestionId/flip-passive', isLoggedIn, suggestionsCtrl.flipPassively)

// GET localhost:3000/suggestions/:suggestionId/edit
router.get('/:suggestionId/edit', isLoggedIn, suggestionsCtrl.edit)



export {
  router
}