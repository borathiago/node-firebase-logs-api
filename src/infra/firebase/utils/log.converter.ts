/* Converter log no formato 'MINHA CDN' para o formato 'Agora' */
export function agoraFormattingConverter(log: string): string {
    const parts = log.trim().split('|')
    let [id, statusCode, cacheStatus, request, timeTaken] = parts
    let HTTPMethod
    let URIPath
    let formattedCacheStatus
    if (parts.length === 5) {
        if (typeof request !== 'string') throw new Error(`O campo request não é uma string válida: ${parts}`)
        const cleanedRequest = request.replace(/"/g, '').trim() /* Retirando aspas duplas do campo request */
        const requestParts = cleanedRequest.split(' ') /* Separando os elementos em um array */
        HTTPMethod = requestParts[0] /* Retirando o método HTTP das partes combinadas em array */
        const path = requestParts.slice(1, -1).join(' ') /* Retirando a path das partes combinadas em array */
        const HTTPversion = requestParts[requestParts.length - 1] /* Retirando a versão do protocolo das partes combinadas em array */
        URIPath = `${path} ${HTTPversion}`
        const statusMap: Record<string, string> = { /* Mapeando (com o utilitário Record<Keys, Type>) o status do cache de 'MINHA CDN' para o formado 'Agora' */
            'HIT': 'HIT',
            'MISS': 'MISS',
            'INVALIDATE': 'REFRESH_HIT'
        }
        formattedCacheStatus = statusMap[cacheStatus]
        if (!formattedCacheStatus) throw new Error(`Status de cache inválido: ${cacheStatus}`)
    }
    return `"MINHA CDN" ${HTTPMethod} ${statusCode} ${URIPath} ${timeTaken} ${id} ${formattedCacheStatus}`
}