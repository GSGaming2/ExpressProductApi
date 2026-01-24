import type { Request, Response } from 'express'
import Users from '../src/models/users.models.ts'
import bcrypt  from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../config/Jwt.ts'
import type { AuthRequest } from '../src/constants/Auth.ts'


const createUser = async (req: Request, res: Response) => {
    try {
        const user = await Users.create(req.body)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const userid = req.user?.userId
        const users = await Users.findById(userid).select("-password").select("-refreshToken");
        res.json(users);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUsers = async (req: Request, res: Response) => {
    const {id} = req.params 
    const user = await Users.findByIdAndUpdate(id, req.body, {new: true})
    if (!user) {
        return res.status(404).send('User not found')
    }
    res.status(200).send(user)
}

const deleteUsers = async (req: Request, res: Response) => {
    const {id} = req.params 
    const user = await Users.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).send('User not found')
    }
    res.status(200).send({message: 'User deleted'})
}

const Login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({email})
        if (!user) {
            return res.status(404).send('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send('Incorrect password')
        }

        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())
        res.status(200).json({accessToken, refreshToken})

        user.refreshToken = refreshToken
        await user.save()
    } catch (error) {
        res.status(500).send(error)
    }
}

const logout = async (req: AuthRequest, res: Response) => {
    try{
        const user = await Users.findById(req.user?.userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        user.refreshToken = null;
        await user.save()
        res.status(201).send('logout successful')
    }
    catch (error) {
        res.status(500).send(error) 
    }
}

export {createUser, getUsers, updateUsers, deleteUsers, Login, logout}