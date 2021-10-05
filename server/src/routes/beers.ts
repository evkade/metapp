import express, { Request, Response } from "express";
import { getBeers } from '../controllers/beers'

const router = express.Router();

router.post(
  "/api/beers",
  async (req: Request, res: Response) => {
    const body = await getBeers(req.body.name).then(data => data);
    if (body) res.status(200).send(body);
    else res.status(404)
  }
);

export { router as beerRouter };