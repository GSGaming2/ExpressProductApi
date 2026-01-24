import {ExternalProduct} from '../src/models/externalProduct.models.ts'
import { fetchExternalProduct, mapToProduct } from '../services/externalApi.ts'
import type { Request, Response } from 'express'


export const importProducts = async (req: Request, res: Response,) => {
    try {
        const data = await fetchExternalProduct()
        const mappedData = mapToProduct(data)
        const product = await ExternalProduct.create(mappedData)
        res.status(201).send(product)
    }
    catch (error) {
        res.status(500).send(error)
    }
}