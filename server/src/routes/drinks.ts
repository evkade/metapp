import express, { Request, Response } from "express";
import { getBeers } from '../controllers/drinks'

const router = express.Router();

router.post(
  "/api/drinks",
  async (req: Request, res: Response) => {
    console.log('[REQ]', req)
    console.log('[REQ BODY]', req.body)
    const body = await getBeers(req.body).then(data => data);
    console.log('[BODY]', body)
    if (body) res.status(200).send(body);
    else res.status(404)
  }
);

export { router as drinkRouter };

