import express from 'express'
import mongoose from 'mongoose'
import Product from './models/product.models.ts'
import router from './routes/product.route.ts'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

const ApiDatabase: string | undefined = process.env.API_DATABASE_URL

mongoose.connect(`${ApiDatabase}`)
    .then(() => {
        console.log('Connected to DataBase')
        app.listen(3400, () => {
            console.log('App listening on port 3400!')
        });
    })
    .catch(() => console.log('Failed to connect to MongoDB'));

