import express, { Request, Response } from "express";
import { getUsers, addUser } from '../controllers/users'
import { isSignedIn } from '../services/middleware'

const router = express.Router();

router.get('/api/user',isSignedIn, async (req: Request, res: Response) => {

    if(!req.currentUser){
        res.send(400)
    }

    // @ts-ignore
    const users = await getUsers().then(data => data);

    res.status(200).send({users});

});

router.post('/api/user', isSignedIn ,async (req: Request, res: Response) => {

    if(!req.currentUser){
        res.send(400)
    }

    // @ts-ignore
    await addUser(req.body);

    res.send(200);

});

export { router as userRouter };

