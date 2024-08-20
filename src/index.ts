import express from 'express'
import { env } from './core/env/env'
import logRoutes from './infra/http/routes/log.routes'

export const app = express()
const PORT = env?.PORT || 3333

app.use(express.json())
app.use('/api', logRoutes)

app.listen(PORT, () => {
    console.log(`:${PORT} rodando`)
})