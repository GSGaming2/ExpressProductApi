import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'
import User from '../src/models/users.models.ts'
import { generateAccessToken } from './Jwt.ts'

dotenv.config()

export const refreshToken = (req: Request, res: Response) => {
    const {refreshToken} = req.body;

    if (!refreshToken) return res.sendStatus(401);

    const user = User.findOne({refreshToken});
    if (!user) return res.sendStatus(403);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };

        const newAccessToken = generateAccessToken(decoded.userId);
        res.json({accessToken: newAccessToken});

        
    } catch (error) {
        return res.sendStatus(403);
    }
    
}