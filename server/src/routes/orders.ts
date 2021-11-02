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
    try {
      const orders = await getOrders(req.query.currentbar);

      res.status(200).send({ orders: orders });
    } catch (error) {
      next(new ErrorException(ErrorCode.badRequest))
    }
  }
);

router.post(
  "/api/orders",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    try {
      const order = await addOrder(req.body);

      res.status(201).send(order);
    }
    catch (error) {
      next(new ErrorException(ErrorCode.badRequest))
    }
  }
);

router.post(
  "/api/orders/make",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    try {
      await makeBeverage(req.body.id, req.body.timestamp);
      res.sendStatus(200);
    }
    catch (error) {
      next(new ErrorException(ErrorCode.badRequest))
    }
  }
);

router.post(
  "/api/orders/pay",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    try {
      await payForBeverage(req.body.id, req.body.timestamp);

      res.sendStatus(200);
    }
    catch (error) {
      next(new ErrorException(ErrorCode.badRequest))
    }
  }
);

router.post(
  "/api/orders/cancel",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || !req.currentUser.isAdmin) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    try {
      await cancelOrder(req.body.id);

      res.sendStatus(200);

    } catch (error) {
      next(new ErrorException(ErrorCode.badRequest));
    }

  }
);

router.get(
  "/api/orders/user",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    try {
      const orders = await getUserOrders(req.query.id);

      res.status(200).send(orders);
    }
    catch (error) {
      next(new ErrorException(ErrorCode.badRequest));
    }
  }
);

export { router as orderRouter };
