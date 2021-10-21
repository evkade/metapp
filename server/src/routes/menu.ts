import { getActiveBeers, getBeers } from "../controllers/beers";
import { getActiveCocktails, getCocktails } from "../controllers/cocktails";
import express, { NextFunction, Request, Response } from "express";
import { ErrorException } from "../services/error-handler/errorException";
import { ErrorCode } from "../services/error-handler/errorCode";



const router = express.Router();


router.get(
    "/api/menu",
    async (req: Request, res: Response, next: NextFunction) => {

        if (req.query && req.query.currentbar) {
            const currentbar = (req.query as any).currentbar;
            if (currentbar === "dkm" || currentbar === "mkm") {

                const beerBody = await getActiveBeers(currentbar).then(data => data);
                const cocktailBody = await getActiveCocktails(currentbar).then(data => data);
                const Menu = { BeerMenu: beerBody, CocktailMenu: cocktailBody };

                if (beerBody && cocktailBody) res.status(200).send(Menu);
                else next(new ErrorException(ErrorCode.NotFound))
            }
        }
        next(new ErrorException(ErrorCode.badRequest))
    }
);

router.get(
    "/api/fullmenu",
    async (req: Request, res: Response, next: NextFunction) => {

        if (req.query && req.query.currentbar) {
            const currentbar = (req.query as any).currentbar;
            if (!(currentbar === "dkm" || currentbar === "mkm")) {
                next(new ErrorException(ErrorCode.badRequest))
            }
            const beerBody = await getBeers(currentbar).then(data => data);
            const cocktailBody = await getCocktails(currentbar).then(data => data);
            const Menu = { BeerMenu: beerBody, CocktailMenu: cocktailBody };

            if (beerBody && cocktailBody) res.status(200).send(Menu);
            else next(new ErrorException(ErrorCode.NotFound))
        }
        next(new ErrorException(ErrorCode.badRequest))
    }
);


export { router as menuRouter };