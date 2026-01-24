import express from 'express'
import Product from '../src/models/product.models.ts'
const router = express.Router()
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/product.controller.ts'
import { createUser, getUsers, updateUsers, deleteUsers, Login, logout } from '../controllers/user.controller.ts'
import { get } from 'node:http'
import { tokenAuthenticator } from '../config/tokenAuthenticator.ts'
import { refreshToken } from '../config/refreshToken.ts'
import { importProducts } from '../controllers/externalApi.controller.ts'

// product routs
router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)
router.post('/api/products', createProduct)
router.put('/api/products/:id', updateProduct)
router.delete('/api/products/:id', deleteProduct)

// user routs
router.post('/api/users', createUser)
router.get('/api/users', tokenAuthenticator, getUsers)
router.put('/api/users/:id', updateUsers)
router.delete('/api/users/:id', deleteUsers)
router.post('/api/login', Login)
router.post('/api/refresh', refreshToken)
router.post('/api/logout',tokenAuthenticator, logout)

// external api routs
router.post('/api/import',tokenAuthenticator, importProducts)


export default router