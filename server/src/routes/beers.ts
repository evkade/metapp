
import express, { Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { getBeerById, getActiveBeers, getBeers, upsertBeer, deleteBeerById } from '../controllers/beers'

const router = express.Router();



router.get(
  "/api/beer",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getBeers(currentbar).then(data => data).catch(err => { res.status(404) });
      if (body) res.status(200).send(body);
      else res.status(404)
    }
    else res.status(401)


  }
);

router.get(
  "/api/activebeers",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar) {

      const currentbar = (req.query as any).currentbar;
      const body = await getActiveBeers(currentbar).then(data => data).catch(err => { res.status(404) });
      if (body) res.status(200).send(body);
      else res.status(404)
    }
    else res.status(401)


  }
);

router.post(
  "/api/beer", isSignedIn,
  async (req: Request, res: Response) => {

    if (req.currentUser === undefined) {
      return res.status(400).send("Not authorized");
    }

    if (req.query && req.query.currentbar && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;

      if (currentbar === "dkm" || currentbar === "mkm") {
        const body = await upsertBeer(currentbar, req.body).then(data => data);
        if (body) return res.status(200).send(body);
        else return res.sendStatus(403)
      }
    }
    return res.sendStatus(400)

  });

router.get(
  "/api/beer/:id",
  async (req: Request, res: Response) => {
    if (req.query && req.query.currentbar && req.params && req.params.id) {
      const currentbar = (req.query as any).currentbar;
      const beerId = (req.params as any).id;
      if (!(currentbar === "dkm" || currentbar === "mkm")) {
        res.sendStatus(400)
      }
      else {
        const body = await getBeerById(currentbar, beerId).then(data => data);
        if (body) res.status(200).send(body);
        else res.status(404)
      }

    } else {
      res.sendStatus(400)
    }

  }
);

router.delete(
  "/api/beer/:id", isSignedIn,
  async (req: Request, res: Response) => {
    if (req.currentUser === undefined) {
      return res.status(403).send("Not authorized");
    }
    if (req.query && req.query.currentbar && req.params && req.params.id && req.currentUser.isAdmin) {
      const currentbar = (req.query as any).currentbar;
      const beerId = (req.params as any).id;
      if (!(currentbar === "dkm" || currentbar === "mkm")) {
        res.sendStatus(400)
      }
      else {

        const body = await deleteBeerById(currentbar, beerId).then(data => data);
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
  "/api/beer", isSignedIn,
  async (req: Request, res: Response) => {

    res.sendStatus(400)
  }
);

export { router as beerRouter };