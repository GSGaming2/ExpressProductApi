import express from 'express'
import type { Request, Response } from 'express'
import Product from '../src/models/product.models.ts'


const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params 
        const products = await Product.findById(id)
        res.send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params 
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if (!product) {
            return res.status(404).send('Product not found')
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params 
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).send('Product not found')
        }
        res.status(200).send({message: 'Product deleted'})
    } catch (error) {
        res.status(500).send(error)
    }
}


export {getProducts, getProduct, createProduct, updateProduct, deleteProduct}