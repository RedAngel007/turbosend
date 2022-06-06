import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import httpstatus from 'http-status-codes'


export const checkRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = UserRepository;
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (error) {
            return res.status(httpstatus.BAD_REQUEST).send();
        }

        if (roles.indexOf(user.role) > -1) {
            next();
        }
        else {
            return res.status(httpstatus.BAD_REQUEST).send();
        }
    }
}