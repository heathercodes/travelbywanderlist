import { Router } from 'express';
import * as userController from '../controllers/user';

const userRouter = Router();

userRouter.post('', userController.createUser).get('', userController.getUser);

export { userRouter };
