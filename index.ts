import express from 'express'
import mongoose from 'mongoose'
import Product from './models/product.models.ts'
import router from './routes/product.route.ts'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

mongoose.connect('mongodb+srv://Elvis_Node:Vicsron218*@nodeproject.t7utwbj.mongodb.net/Node-API?appName=NodeProject')
    .then(() => {
        console.log('Connected to DataBase')
        app.listen(3400, () => {
            console.log('App listening on port 3400!')
        });
    })
    .catch(() => console.log('Failed to connect to MongoDB'));

