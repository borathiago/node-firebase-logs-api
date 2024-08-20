import { addDoc, collection, getDocs } from 'firebase/firestore'
import { database } from '../../../database/firebase/config/firebase.config'

export interface AgoraResponse {
    originalURL: string,
    agora: string,
    timeStamp: Date
}

export class Firebase {
    async save(agora: AgoraResponse) {
        try {
            const logsCollection = collection(database, 'logs') /* Referenciar a coleção de logs no Firebase */
            await addDoc(logsCollection, agora) /* Salvar no banco */
        } catch(error) {
            throw new Error('Erro ao salvar no banco de dados Firebase')
        }
    }
    async getData(): Promise<{ totalLogs: number; totalConversions: number; histogram: { date: string; conversions: number }[] }> {
        try {
            const logsCollection = collection(database, 'logs')
            const logsSnapshot = await getDocs(logsCollection)

            const totalLogs = logsSnapshot.size
            let totalConversions = 0
            const dailyConversions: { [key: string]: number } = {}

            logsSnapshot.forEach(doc => {
                const data = doc.data()
                totalConversions++
                const convertedAt = data.timeStamp?.toDate()
                if (convertedAt) {
                    const dateKey = `${convertedAt.getFullYear()}-${String(convertedAt.getMonth() + 1).padStart(2, '0')}-${String(convertedAt.getDate()).padStart(2, '0')}`
                    dailyConversions[dateKey] = (dailyConversions[dateKey] || 0) + 1
                } else {
                    console.warn('Campo timeStamp não encontrado ou inválido no documento', doc.id)
                }
            })
            const histogram = Object.keys(dailyConversions).map(date => ({
                date,
                conversions: dailyConversions[date],
            }))
            return {
                totalLogs,
                totalConversions,
                histogram,
            }
        } catch (error) {
            throw new Error('Falha ao trazer estatísticas')
        }
    }
}