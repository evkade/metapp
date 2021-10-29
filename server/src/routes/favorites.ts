


import express, { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../services/error-handler/errorCode";
import { ErrorException } from "../services/error-handler/errorException";
import { isSignedIn } from '../services/middleware';
import { getfavorites, addFavoriteById, deleteFavoriteById, getfavoritesByPub } from "../controllers/favorites";

const router = express.Router();

//show favorites per pub ()
router.get("/api/favorite", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    else {
        if (req.query && req.query.currentbar) {
            const currentbar = (req.query as any).currentbar;
            console.log(currentbar)
            if (currentbar === "dkm" || currentbar === "mkm") {
                const data = await getfavoritesByPub(req.currentUser._id, currentbar).catch(err => { next(new ErrorException(ErrorCode.badRequest, err)) })
                return res.status(200).send(data);
            }
            else {
                return next(new ErrorException(ErrorCode.badRequest))
            }
        }
        else {
            const data = await getfavorites(req.currentUser._id).catch(err => { next(new ErrorException(ErrorCode.badRequest, err)) })
            return res.status(200).send(data);
        }
    }
});

//add to favorites (by id)
router.post("/api/favorite", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser === undefined) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    else {
        console.log(req.body)
        const body = await addFavoriteById(req.currentUser!._id, req.body).then(data => data).catch(err => next(new ErrorException(ErrorCode.badRequest, err)));
        if (body) return res.status(200).send(body);
        else if (body === null) return next(new ErrorException(ErrorCode.BeverageAlreadyExists))
        else if (body === undefined) return next(new ErrorException(ErrorCode.BeverageNotFound))
        else return next(new ErrorException(ErrorCode.NotFound))
    }

});
//remove from favorites (by id)
router.delete("/api/favorite", isSignedIn, async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        next(new ErrorException(ErrorCode.Unauthenticated))
    }
    else {
        const body = await deleteFavoriteById(req.currentUser!._id, req.body).then(data => data).catch(err => next(new ErrorException(ErrorCode.badRequest, err)));
        if (body) return res.status(200).send(body);
        else if (body === null) return next(new ErrorException(ErrorCode.BeverageNotFound))
        else return next(new ErrorException(ErrorCode.NotFound))
    }
});

export { router as favoriteRouter };