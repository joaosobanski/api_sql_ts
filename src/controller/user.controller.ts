import IUser from "../interface/IUser";

import { Request, Response } from 'express'
import AuthMiddleware from '../middleware/auth.middleware'
import PrismaDB from "../prisma.service";
import bcrypt from 'bcrypt'

class UserController {

    public static async createUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const pwd = await bcrypt.hash(password, 10);

            const user = await PrismaDB.usuario.create({
                data: {
                    username,
                    password: pwd
                }
            }) as IUser

            res.json(user)
        } catch (err) {
            res.status(400).json((err as Error).message)
        }
    }

    public static async authenticate(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await PrismaDB.usuario.findFirst({
                where: {
                    username
                }
            })
            if (bcrypt.compareSync(password, user.password)) {
                const token = await AuthMiddleware.sign(user);
                res.status(200).json({
                    ...user,
                    token
                })
            } else {
                throw new Error("Senha inválida!")
            }
        } catch (err) {
            res.status(400).json((err as Error).message)
        }

    }
}


export default UserController