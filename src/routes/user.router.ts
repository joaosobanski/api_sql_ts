
import express from 'express';
import UserController from '../controller/user.controller';

const userRouter = express.Router();

userRouter.post('/', UserController.createUser);
userRouter.post('/auth', UserController.authenticate);


export default userRouter;