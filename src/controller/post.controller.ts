
import { Request, Response } from 'express'
import PrismaDB from "../prisma.service";
import IRequest from '../interface/IRequest';

class PostController {

    public static async create(req: IRequest, res: Response) {
        try {
            const user = req.body;

            const data = await PrismaDB.post
                .create({
                    data: {
                        ...user,
                        ownerId: Number(req.user.id),
                    }
                })

            res.json(data)
        } catch (err) {
            res.status(400).json((err as Error).message)
        }
    }

    public static async update(req: IRequest, res: Response) {
        try {
            const user = req.body;
            const { id } = req.query

            const data = await PrismaDB.post
                .update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        ...user,
                    }
                })

            res.json(data)
        } catch (err) {
            res.status(400).json((err as Error).message)
        }
    }
    public static async get(req: IRequest, res: Response) {
        try {

            const data = await PrismaDB.post
                .findMany()

            res.json(data)
        } catch (err) {
            res.status(400).json((err as Error).message)
        }
    }
}


export default PostController