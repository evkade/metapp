import express, { Request, Response } from "express";
import { getDrinks } from '../controllers/drinks'

const router = express.Router();

router.get(
  "/api/drinks",
  async (req: Request, res: Response) => {
    
    const body = await getDrinks().then(data => data);

    console.log(body)

    if(body) res.status(200).send(body);
    else res.status(404)
  }
);

export { router as drinkRouter };

