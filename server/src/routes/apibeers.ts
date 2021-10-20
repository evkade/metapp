import { getAPIBeers } from '../controllers/apiBeers'
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
    "/api/apibeers",
    async (req: Request, res: Response) => {
        const body = await getAPIBeers(req.body.name).then(data => data);
        if (body) res.status(200).send(body);
        else res.status(404)
    }
);

export { router as apiBeerRouter };