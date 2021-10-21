
import express, { NextFunction, Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { getCocktailById, getActiveCocktails, getCocktails, upsertCocktail, deleteCocktailById } from '../controllers/cocktails';
import { ErrorCode } from "../services/error-handler/errorCode";
import { ErrorException } from "../services/error-handler/errorException";

const router = express.Router();



router.get(
  "/api/cocktail",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getCocktails(currentbar).then(data => data).catch(err => { next(new ErrorException(ErrorCode.badRequest, err)) });
      if (body) res.status(200).send(body);
      else next(new ErrorException(ErrorCode.NotFound))
    }
    else next(new ErrorException(ErrorCode.badRequest))


  }
);

router.get(
  "/api/activecocktails",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getActiveCocktails(currentbar).then(data => data).catch(err => { next(new ErrorException(ErrorCode.badRequest, err)) });
      if (body) res.status(200).send(body);
      else next(new ErrorException(ErrorCode.NotFound))
    }
    else next(new ErrorException(ErrorCode.badRequest))


  }
);

router.post(
  "/api/cocktail", isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser === undefined) {
      next(new ErrorException(ErrorCode.Unauthenticated))
    }

    //@ts-ignore
    if (req.query && req.query.currentbar && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;

      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await upsertCocktail(currentbar, req.body).then(data => data);
        if (body) return res.status(200).send(body);
        else return next(new ErrorException(ErrorCode.NotFound))
      }
    }
    else next(new ErrorException(ErrorCode.badRequest))
  });

router.get(
  "/api/cocktail/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.currentbar && req.params && req.params.id) {
      const currentbar = (req.query as any).currentbar;
      const cocktailId = (req.params as any).id;
      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await getCocktailById(currentbar, cocktailId).then(data => data);
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound))
      }
    }
    else next(new ErrorException(ErrorCode.badRequest))
  });

router.delete(
  "/api/cocktail/:id", isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser === undefined) {
      next(new ErrorException(ErrorCode.Unauthenticated))
    }
    //@ts-ignore
    if (req.query && req.query.currentbar && req.params && req.params.id && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;
      const cocktailId = (req.params as any).id;
      if (currentbar === "dkm" || currentbar === "mkm") {

        const body = await deleteCocktailById(currentbar, cocktailId).then(data => data);
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.BeverageNotFound))
      }
    }
    else next(new ErrorException(ErrorCode.badRequest))
  });

//failsafe if ID is forgotten
router.delete(
  "/api/cocktail", isSignedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorException(ErrorCode.badRequest))
  }
);

export { router as cocktailRouter };