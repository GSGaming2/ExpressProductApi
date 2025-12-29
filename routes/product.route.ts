import express from 'express'
import Product from '../models/product.models.ts'
const router = express.Router()
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/product.controller.ts'


router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)
router.post('/api/products', createProduct)
router.put('/api/products/:id', updateProduct)
router.delete('/api/products/:id', deleteProduct)

export default router