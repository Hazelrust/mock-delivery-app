import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({stdTTL:600})

export const middleware = (req:Request, res:Response, next: NextFunction) => {
    const key = req.originalUrl
    const cacheReponse = cache.get(key)

    if (cacheReponse) {
        return res.json(cacheReponse)
    } else {
        const originalJson = res.json.bind(res)
        res.json = (body:any) => {
            cache.set(key,body)
            return originalJson(body)
        }

        next()
    }
}