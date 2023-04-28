import { Router } from 'express'
import * as suggestionsCtrl from '../controllers/suggestions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


router.get('/', suggestionsCtrl.index)

router.get('/passive', suggestionsCtrl.passive)

router.get('/aggressive', suggestionsCtrl.aggressive)

router.post('/', isLoggedIn, suggestionsCtrl.create)

router.get('/passive', suggestionsCtrl.index)

router.get('/:suggestionId', suggestionsCtrl.show)

router.patch('/:suggestionId/flip-passive', isLoggedIn, suggestionsCtrl.flipPassively)

router.post('/:suggestionId/comments', isLoggedIn, suggestionsCtrl.addComment)

router.delete('/:suggestionId/comments/:commentId', isLoggedIn, suggestionsCtrl.deleteComment)

router.get('/:suggestionId/edit', isLoggedIn, suggestionsCtrl.edit)

router.put('/:suggestionId', isLoggedIn, suggestionsCtrl.update)

router.delete('/:suggestionId', isLoggedIn, suggestionsCtrl.deleteSuggestion)




export {
  router
}