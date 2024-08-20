import { Request, Response } from 'express'
import { LogService } from '../../firebase/services/log.service'
import { AgoraResponse, Firebase } from '../../firebase/database/firebase';

export class LogController {
    private logService = new LogService()
    private firebase = new Firebase()
    async getAgoraLog(request: Request, response: Response): Promise<void> {
        const sourceUrl = request.query.sourceUrl as string
        if (typeof sourceUrl !== 'string') {
            response.status(400).json({ error: 'sourceUrl deve ser uma string'})
            return
        }
        try {
            const CDNtoAgora = await this.logService.fetchAndConvert(sourceUrl)
            const _agora: AgoraResponse = {
                originalURL: sourceUrl,
                agora: CDNtoAgora,
                timeStamp: new Date()
            }
            await this.firebase.save(_agora)
            if (!response.headersSent) {
                response.setHeader('Content-Type', 'text/plain')
                response.send(CDNtoAgora)
            }
        } catch(error) {
            response.status(500).json({ error: 'Ocorreu um erro ao processar e salvar o log' })
        }
    }
    async getStats(_request: Request, response: Response) {
        const { totalLogs, totalConversions, histogram } = await this.firebase.getData()
        response.send({ totalLogs, totalConversions, histogram })
    }
}