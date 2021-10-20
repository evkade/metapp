import { getActiveBeers, getBeers } from "../controllers/beers";
import { getActiveCocktails, getCocktails } from "../controllers/cocktails";
import express, { Request, Response } from "express";

const router = express.Router();


router.get(
    "/api/menu",
    async (req: Request, res: Response) => {

        if (req.query && req.query.currentbar) {
            const currentbar = (req.query as any).currentbar;
            if (!(currentbar === "dkm" || currentbar === "mkm")) {
                res.sendStatus(400)
            }
            const beerBody = await getActiveBeers(currentbar).then(data => data);
            const cocktailBody = await getActiveCocktails(currentbar).then(data => data);
            const Menu = { BeerMenu: beerBody, CocktailMenu: cocktailBody };

            if (beerBody && cocktailBody) res.status(200).send(Menu);
            else res.status(404)
        }
        else res.status(400)
    }
);

router.get(
    "/api/fullmenu",
    async (req: Request, res: Response) => {

        if (req.query && req.query.currentbar) {
            const currentbar = (req.query as any).currentbar;
            if (!(currentbar === "dkm" || currentbar === "mkm")) {
                res.sendStatus(400)
            }
            const beerBody = await getBeers(currentbar).then(data => data);
            const cocktailBody = await getCocktails(currentbar).then(data => data);
            const Menu = { BeerMenu: beerBody, CocktailMenu: cocktailBody };

            if (beerBody && cocktailBody) res.status(200).send(Menu);
            else res.status(404)
        }
        else res.status(400)
    }
);


export { router as menuRouter };