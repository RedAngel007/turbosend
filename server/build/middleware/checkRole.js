"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const user_repository_1 = require("../repository/user.repository");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const checkRole = (roles) => {
    return async (req, res, next) => {
        const id = res.locals.jwtPayload.userId;
        const userRepository = user_repository_1.UserRepository;
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send();
        }
        if (roles.indexOf(user.role) > -1) {
            next();
        }
        else {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send();
        }
    };
};
exports.checkRole = checkRole;
