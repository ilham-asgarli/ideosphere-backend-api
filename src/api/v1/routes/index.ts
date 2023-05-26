import { Router } from 'express'
import auth from './auth.router'
import chat from './chat.router'

const router = Router()

router.use('/auth', auth)
router.use('/chat', chat)

export default router