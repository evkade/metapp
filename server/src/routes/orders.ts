import express, { NextFunction, Request, Response } from "express";
import {
  getOrders,
  addOrder,
  makeBeverage,
  payForBeverage,
  getUserOrders,
  cancelOrder,
} from "../controllers/orders";
import { isSignedIn } from "../services/middleware";
import { ErrorException } from "../services/error-handler/errorException";
import { ErrorCode } from "../services/error-handler/errorCode";

const router = express.Router();

router.get(
  "/api/orders",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }

    console.log(req.query.currentbar);
    const orders = await getOrders(req.query.currentbar);

    res.status(200).send({ orders: orders });
  }
);

router.post(
  "/api/orders",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    console.log("addOrder ", req.body);

    const order = await addOrder(req.body);

    res.status(200).send(order);
  }
);

router.post(
  "/api/orders/make",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }

    console.log("makeDink ", req.body);
    await makeBeverage(req.body.id, req.body.timestamp);

    res.sendStatus(200);
  }
);

router.post(
  "/api/orders/pay",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }

    console.log("payDrink ", req.body);
    await payForBeverage(req.body.id, req.body.timestamp);

    res.sendStatus(200);
  }
);

router.post(
  "/api/orders/cancel",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || !req.currentUser.isAdmin) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }

    console.log("cancelOrder ", req.body);
    await cancelOrder(req.body.id);

    res.sendStatus(200);
  }
);

router.get(
  "/api/orders/user",
  isSignedIn,
  async (req: Request, res: Response) => {
    if (!req.currentUser) return res.send(400);

    console.log(req.query.id);
    const orders = await getUserOrders(req.query.id);

    res.status(200).send(orders);
  }
);

export { router as orderRouter };
