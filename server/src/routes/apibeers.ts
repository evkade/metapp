import { getAPIBeers } from '../controllers/apiBeers'
import express, { Request, Response, NextFunction } from "express";
import { ErrorException } from '../services/error-handler/errorException';
import { ErrorCode } from '../services/error-handler/errorCode';

const router = express.Router();

router.post(
    "/api/apibeers",
    async (req: Request, res: Response, next: NextFunction) => {
        const body = await getAPIBeers(req.body.name).then(data => data);
        if (body) res.status(200).send(body);
        else next(new ErrorException(ErrorCode.badRequest))
    }
);

export { router as apiBeerRouter };