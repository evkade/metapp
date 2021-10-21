import express, { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../services/error-handler/errorCode";
import { ErrorException } from "../services/error-handler/errorException";
import { getUsers, addUser } from '../controllers/users'
import { isSignedIn } from '../services/middleware'

const router = express.Router();

router.get('/api/user', isSignedIn, async (req: Request, res: Response, next: NextFunction) => {

    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }

    // @ts-ignore
    const users = await getUsers().then(data => data);

    res.status(200).send({ users });

});

//will delete
router.post('/api/user', isSignedIn, async (req: Request, res: Response, next: NextFunction) => {

    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }

    // @ts-ignore
    const user = await addUser(req.body);

    res.status(201).send(user);

});

export { router as userRouter };

