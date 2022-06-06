import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../utils";
import httpStatus from 'http-status-codes'
import { clearScreenDown } from 'readline';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['auth'] as string;

    let jwtPayload;
    console.log("token", token)
    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret);
        console.log(jwtPayload)

        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        console.log("error", error)
        return res.status(httpStatus.BAD_GATEWAY).send();
    }

    const { userId, username } = jwtPayload;

    const newToken = jwt.sign({ userId, username }, jwtSecret, { expiresIn: "1h" });

    res.setHeader("token", newToken)

    next();
}