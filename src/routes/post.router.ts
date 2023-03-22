
import express from 'express';
import PostController from '../controller/post.controller';
import AuthMiddleware from '../middleware/auth.middleware';


const postRouter = express.Router();

postRouter.post('/', AuthMiddleware.authenticate, PostController.create);
postRouter.put('/', AuthMiddleware.authenticate, PostController.update);
postRouter.get('/', AuthMiddleware.authenticate, PostController.get);

export default postRouter;