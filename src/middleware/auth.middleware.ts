import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import IRequest from "../interface/IRequest";
import IUser from "../interface/IUser";

class AuthMiddleware {
    public static async authenticate(req: IRequest, res: Response, next: NextFunction) {
        try {
            const [, token] = req.headers.authorization.split(' ');
            jwt.verify(token, process.env.API_SECRET);
            req.user = jwt.decode(token) as IUser
            next()
        } catch (error) {
            res.status(401).send(error);
        }
    }

    public static async sign(user: IUser) {
        const payload = {
            id: user.id,
            username: user.username,
        }
        return jwt.sign(payload, process.env.API_SECRET, { expiresIn: '3600s' });
    }

    public static getUserId(req: Request) {
        const [, token] = req.headers.authorization.split(' ')
        const { payload } = jwt.decode(token, { complete: true });
        console.log(payload)
        return payload;
    }

}

export default AuthMiddleware