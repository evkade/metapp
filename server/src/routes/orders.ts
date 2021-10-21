import express, { NextFunction, Request, Response } from "express";
import {
  getOrders,
  addOrder,
  makeBeverage,
  payForBeverage,
} from "../controllers/orders";
import { isSignedIn } from "../services/middleware";
import { ErrorException } from "../services/error-handler/errorException";
import { ErrorCode } from "../services/error-handler/errorCode";

const router = express.Router();

router.get("/api/orders", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    next(new ErrorException(ErrorCode.Unauthenticated))
  }

  console.log(req.query.currentbar);
  const orders = await getOrders(req.query.currentbar);

  console.log(orders);

  res.status(200).send({ orders: orders });
});

router.post("/api/orders", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    next(new ErrorException(ErrorCode.Unauthenticated))
  }
  console.log("addOrder ", req.body);

  await addOrder(req.body);

  res.send(200);
});

router.post(
  "/api/orders/make",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated))
    }

    console.log("makeDink ", req.body);
    await makeBeverage(req.body.id, req.body.timestamp);

    res.send(200);
  }
);

router.post(
  "/api/orders/pay",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated))
    }

    console.log("payDrink ", req.body);
    await payForBeverage(req.body.id, req.body.timestamp);

    res.send(200);
  }
);

export { router as orderRouter };
