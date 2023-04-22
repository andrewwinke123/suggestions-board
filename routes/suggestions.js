import { Router } from 'express'
import * as suggestionsCtrl from '../controllers/suggestions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', suggestionsCtrl.index)
router.post('/', suggestionsCtrl.create)
router.post('/', isLoggedIn, suggestionsCtrl.create)


export {
  router
}