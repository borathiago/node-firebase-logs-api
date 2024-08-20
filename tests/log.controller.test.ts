import { app } from './../src/index'
import { describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Log Conversion API', () => {
    it('Should return status 400 if sourceUrl is not provided', async () => {
        const response = await request(app).get('/api/convert-log').send()
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            "error": "sourceUrl deve ser uma string"
        })
    })
    it('Should convert log and return the converted log in the correct format', async () => {
        const response = await request(app).get('/api/convert-log').query({ sourceUrl: 'https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt' })
        expect(response.headers['content-type']).toEqual('text/plain; charset=utf-8');
        expect(response.status).toEqual(200);
    })
    it('Should return 500 if there is an error during log conversion', async () => {
        const response = await request(app).get('/api/convert-log').query({ sourceUrl: 'https://example.com/minha-cdn-log' })
        expect(response.status).toEqual(500)
        expect(response.body).toEqual({
            "error": "Ocorreu um erro ao processar e salvar o log"
        })
    })
})