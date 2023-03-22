import express, { Request, Response } from 'express'
import PrismaDB from './prisma.service';
import logger from './utils/logger'

import userRouter from './routes/user.router'
import postRouter from './routes/post.router'

const app = express()


app.use(express.json());

// app.post('/post', async (req: Request, res: Response) => {
//     const { teste } = req.body
//     console.log(teste)
//     // const post = await prisma.post.create({
//     //   data: {
//     //     title,
//     //     content,
//     //     published: false,
//     //     author: { connect: { email: authorEmail } },
//     //   },
//     // })
//     res.json(teste)
// })

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3003, async () => {
    logger.info("Api rodando na porta 3003")

    await PrismaDB.$connect().then(() => logger.info("Conectou no banco de dados!"))

})