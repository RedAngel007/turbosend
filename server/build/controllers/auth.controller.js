"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const user_repository_1 = require("../repository/user.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const middleware_1 = require("../middleware");
class AuthController {
    constructor() {
        this.login = async (req, res) => {
            const { username, password } = req.body;
            if (!(username && password)) {
                res.status(400).send();
            }
            let user;
            try {
                user = await this.userRepository.findOneOrFail({ where: { userName: username } });
            }
            catch (error) {
                return res.status(401).send();
            }
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                return res.status(401).send();
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.userName }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send(token);
        };
        this.changePassword = async (req, res) => {
            const id = res.locals.jwtPayload.userId;
            const { oldPassword, newPassword } = req.body;
            if (!(oldPassword && newPassword)) {
                res.status(400).send();
            }
            let user;
            try {
                user = await this.userRepository.findOneOrFail(id);
            }
            catch (id) {
                return res.status(401).send();
            }
            if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
                return res.status(401).send();
            }
            user.password = newPassword;
            const errors = await (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            user.hashPassword();
            this.userRepository.save(user);
            res.status(204).send();
        };
        this.userRepository = user_repository_1.UserRepository;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/login", this.login);
        this.router.post("/change-password", [middleware_1.checkAuth, (0, middleware_1.checkRole)(["ADMIN"])], this.changePassword);
    }
}
exports.AuthController = AuthController;
