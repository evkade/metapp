
import express, { Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { getCocktailById, getActiveCocktails, getCocktails, upsertCocktail, deleteCocktailById } from '../controllers/cocktails';

const router = express.Router();



router.get(
  "/api/cocktail",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getCocktails(currentbar).then(data => data).catch(err => { res.status(404) });
      if (body) res.status(200).send(body);
      else res.status(404)
    }
    else res.status(401)


  }
);

router.get(
  "/api/activecocktails",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getActiveCocktails(currentbar).then(data => data).catch(err => { res.status(404) });
      if (body) res.status(200).send(body);
      else res.status(404)
    }
    else res.status(401)


  }
);

router.post(
  "/api/cocktail", isSignedIn,
  async (req: Request, res: Response) => {

    if (req.currentUser === undefined) {
      return res.status(400).send("Not authorized");
    }

    if (req.query && req.query.currentbar && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;

      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await upsertCocktail(currentbar, req.body).then(data => data);
        if (body) return res.status(200).send(body);
        else return res.sendStatus(403)
      }
    }
    return res.sendStatus(400)

  });

router.get(
  "/api/cocktail/:id",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar && req.params && req.params.id) {
      const currentbar = (req.query as any).currentbar;
      const cocktailId = (req.params as any).id;
      if (!(currentbar === "dkm" || currentbar === "mkm")) {
        res.sendStatus(400)
      }
      else {
        const body = await getCocktailById(currentbar, cocktailId).then(data => data);
        if (body) res.status(200).send(body);
        else res.status(404)
      }

    } else {
      res.sendStatus(400)
    }

  }
);

router.delete(
  "/api/cocktail/:id", isSignedIn,
  async (req: Request, res: Response) => {
    if (req.currentUser === undefined) {
      return res.status(403).send("Not authorized");
    }
    if (req.query && req.query.currentbar && req.params && req.params.id && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;
      const cocktailId = (req.params as any).id;
      if (!(currentbar === "dkm" || currentbar === "mkm")) {
        res.sendStatus(400)
      }
      else {

        const body = await deleteCocktailById(currentbar, cocktailId).then(data => data);
        if (body) res.status(200).send(body);
        else res.status(404)
      }

    } else {
      res.sendStatus(400)
    }

  }
);

//failsafe if ID is forgotten
router.delete(
  "/api/cocktail", isSignedIn,
  async (req: Request, res: Response) => {

    res.sendStatus(400)
  }
);

export { router as cocktailRouter };