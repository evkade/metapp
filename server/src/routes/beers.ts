import express, { Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import {
  getBeerById,
  getActiveBeers,
  getBeers,
  upsertBeer,
  deleteBeerById,
} from "../controllers/beers";

const router = express.Router();

router.get("/api/beer", async (req: Request, res: Response) => {
  if (req.query && req.query.currentpub) {
    const currentpub = (req.query as any).currentpub;
    const body = await getBeers(currentpub)
      .then((data) => data)
      .catch((err) => {
        res.status(404);
      });
    if (body) res.status(200).send(body);
    else res.status(404);
  } else res.status(401);
});

router.get("/api/activebeers", async (req: Request, res: Response) => {
  if (req.query && req.query.currentpub) {
    const currentpub = (req.query as any).currentpub;
    const body = await getActiveBeers(currentpub)
      .then((data) => data)
      .catch((err) => {
        res.status(404);
      });
    if (body) res.status(200).send(body);
    else res.status(404);
  } else res.status(401);
});

router.post("/api/beer", isSignedIn, async (req: Request, res: Response) => {
  if (req.currentUser === undefined) {
    return res.status(400).send("Not authorized");
  }

  if (req.query && req.query.currentpub && req.currentUser.isAdmin) {
    const currentpub = (req.query as any).currentpub;

    if (currentpub === "DKM" || currentpub === "MKM") {
      const body = await upsertBeer(currentpub, req.body).then((data) => data);
      if (body) return res.status(200).send(body);
      else return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
});

router.get("/api/beer/:id", async (req: Request, res: Response) => {
  if (req.query && req.query.currentpub && req.params && req.params.id) {
    const currentpub = (req.query as any).currentpub;
    const beerId = (req.params as any).id;
    if (!(currentpub === "DKM" || currentpub === "MKM")) {
      res.sendStatus(400);
    } else {
      const body = await getBeerById(currentpub, beerId).then((data) => data);
      if (body) res.status(200).send(body);
      else res.status(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete(
  "/api/beer/:id",
  isSignedIn,
  async (req: Request, res: Response) => {
    if (req.currentUser === undefined) {
      return res.status(403).send("Not authorized");
    }
    if (
      req.query &&
      req.query.currentpub &&
      req.params &&
      req.params.id &&
      req.currentUser.isAdmin
    ) {
      const currentpub = (req.query as any).currentpub;
      const beerId = (req.params as any).id;
      if (!(currentpub === "DKM" || currentpub === "MKM")) {
        res.sendStatus(400);
      } else {
        const body = await deleteBeerById(currentpub, beerId).then(
          (data) => data
        );
        if (body) res.status(200).send(body);
        else res.status(404);
      }
    } else {
      res.sendStatus(400);
    }
  }
);

//failsafe if ID is forgotten
router.delete("/api/beer", isSignedIn, async (req: Request, res: Response) => {
  res.sendStatus(400);
});

export { router as beerRouter };
