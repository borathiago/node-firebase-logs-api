import 'dotenv/config'
import { z } from 'zod'

const envScehma = z.object({
    PORT: z.coerce.number().default(3333),
    APIKEY: z.string(),
    AUTHDOMAIN: z.string(),
    PROJECTID: z.string(),
    STORAGEBUCKET: z.string(),
    MESSAGESENDERID: z.string(),
    APPID: z.string(),
})

const _env = envScehma.safeParse(process.env)

export const env = _env.data