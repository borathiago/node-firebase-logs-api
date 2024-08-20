import { Router } from 'express'
import { LogController } from '../controllers/log.controller'

const router = Router()
const logController = new LogController()

router.get('/convert-log', (request, response) => logController.getAgoraLog(request, response))
router.get('/stats', (request, response) => logController.getStats(request, response))

export default router