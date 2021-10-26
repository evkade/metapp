


import express, { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../services/error-handler/errorCode";
import { ErrorException } from "../services/error-handler/errorException";
import { User } from "../models/interfaces";
import { isSignedIn } from '../services/middleware';
import { getfavorites, addFavoriteById } from "../controllers/favorites";
import { json } from "stream/consumers";

const router = express.Router();


//get favorites

router.get("/api/favorite", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    else {
        console.log("NJJ")
        const data = await getfavorites(req.currentUser._id).catch(err => { next(new ErrorException(ErrorCode.badRequest, err)) })
        console.log(data)
        return res.status(200).send(data[0].favorites);
    }
});


//add to favorites (by id)
router.post("/api/favorite", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser === undefined) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }

    console.log("george: " + JSON.stringify(req.currentUser!))
    console.log("george1: " + req.currentUser?._id)



    //  if (req.query && req.query.currentbar) {
    //  const currentbar = (req.query as any).currentbar;

    //if (currentbar === "dkm" || currentbar === "mkm") {
    const body = await addFavoriteById(req.currentUser!._id, req.body).then(data => data);
    if (body) return res.status(200).send(body);
    else return next(new ErrorException(ErrorCode.NotFound))
    //}
    //  }
    //  else next(new ErrorException(ErrorCode.badRequest))

    return res.status(200).send({ currentUser: req.currentUser });
});
//remove from favorites (by id)
router.delete("/api/favorite:beerid", isSignedIn, (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    return res.status(200).send({ currentUser: req.currentUser });
});

//show favorites per pub ()
router.get("/api/favorite:currentpub", isSignedIn, (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    return res.status(200).send({ currentUser: req.currentUser });
});

//show favorite beers
router.get("/api/favorite/beers", isSignedIn, (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    return res.status(200).send({ currentUser: req.currentUser });
});


//show favorite cocktails
//show favorite beers
router.get("/api/favorite/cocktails", isSignedIn, (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    return res.status(200).send({ currentUser: req.currentUser });
});


export { router as favoriteRouter };