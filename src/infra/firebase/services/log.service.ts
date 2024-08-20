import axios from 'axios'
import { agoraFormattingConverter } from '../utils/log.converter'

export class LogService {
    async fetchAndConvert(URL: string): Promise<string> {
        const response = await axios.get(URL)
        const header = [
            '#Version: 1.0',
            `#Date: ${new Date().toLocaleString()}`,
            '#Fields: provider http-method status-code uri-path time-taken response-size cache-status'
        ]
        const minhaCDN = response.data.split('\n').map(agoraFormattingConverter)
        const agora = `${header.join('\n')}\n${minhaCDN.join('\n')}`
        return agora
    }
}

