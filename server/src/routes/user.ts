import express, { Request, Response } from "express";
import { getUsers, addUser } from '../controllers/users'

const router = express.Router();

router.get('/api/user', async (req: Request, res: Response) => {

    // @ts-ignore
    await getUsers().then(data => data);

    res.send(200);

});

router.post('/api/user', async (req: Request, res: Response) => {

    // @ts-ignore
    await addUser(req.body);

    res.send(200);

});

export { router as userRouter };

