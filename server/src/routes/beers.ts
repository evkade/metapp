import express, { NextFunction, Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import {
  getBeerById,
  getActiveBeers,
  getBeers,
  upsertBeer,
  deleteBeerById,
} from "../controllers/beers";
import { ErrorException } from "../services/error-handler/errorException";
import { ErrorCode } from "../services/error-handler/errorCode";

const router = express.Router();

router.get(
  "/api/beer",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar) {
      const currentbar = (req.query as any).currentbar;
      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await getBeers(currentbar)
          .then((data) => data)
          .catch((err) => {
            next(new ErrorException(ErrorCode.badRequest, err));
          });
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound));
      } else next(new ErrorException(ErrorCode.badRequest));
    } else next(new ErrorException(ErrorCode.badRequest));
  }
);

router.get(
  "/api/activebeers",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar) {
      const currentbar = (req.query as any).currentbar;
      if (currentbar === "dkm" || currentbar === "mkm") {
        const currentbar = (req.query as any).currentbar;
        const body = await getActiveBeers(currentbar)
          .then((data) => data)
          .catch((err) => {
            next(new ErrorException(ErrorCode.badRequest, err));
          });
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound));
      }
    } else next(new ErrorException(ErrorCode.badRequest));
  }
);

router.post(
  "/api/beer",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser === undefined) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    //@ts-ignore
    if (
      req.query &&
      req.query.currentbar &&
      req.currentUser !== undefined &&
      req.currentUser.isAdmin
    ) {
      const currentbar = (req.query as any).currentbar;

      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await upsertBeer(currentbar, req.body).then(
          (data) => data
        );
        if (body) return res.status(201).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound));
      }
    }
    next(new ErrorException(ErrorCode.badRequest));
  }
);

router.get(
  "/api/beer/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar && req.params && req.params.id) {
      const currentbar = (req.query as any).currentbar;
      const beerId = (req.params as any).id;
      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await getBeerById(currentbar, beerId).then((data) => data);
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound));
      }
    }
    next(new ErrorException(ErrorCode.badRequest));
  }
);

router.delete(
  "/api/beer/:id",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser === undefined) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    //@ts-ignore
    if (
      req.query &&
      req.query.currentbar &&
      req.params &&
      req.params.id &&
      req.currentUser &&
      req.currentUser.isAdmin
    ) {
      const currentbar = (req.query as any).currentbar;
      const beerId = (req.params as any).id;
      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await deleteBeerById(currentbar, beerId).then(
          (data) => data
        );
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound));
      }
    } else next(new ErrorException(ErrorCode.badRequest));
  }
);

//failsafe if ID is forgotten
router.delete(
  "/api/beer",
  isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorException(ErrorCode.badRequest));
  }
);

export { router as beerRouter };
