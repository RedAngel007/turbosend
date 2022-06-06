"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_validator_1 = require("class-validator");
const express_1 = require("express");
const user_entity_1 = require("../entities/user.entity");
const checkAuth_1 = require("../middleware/checkAuth");
const checkRole_1 = require("../middleware/checkRole");
const user_repository_1 = require("../repository/user.repository");
class UserController {
    /**
     *
     */
    constructor() {
        this.getUserByEmail = async (email) => {
            if (!email.isNullOrEmpty()) {
                const user = await user_repository_1.UserRepository.findOneOrFail({ where: { email: email } });
                return user;
            }
            return null;
        };
        this.index = async (req, res) => {
            try {
                const users = await this.userRepository.find({});
                return res.send(users);
            }
            catch (error) {
                return res.status(500).send();
            }
        };
        this.getUserById = async (req, res) => {
            const id = req["params"]["id"];
            try {
                const user = await this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                    select: {
                        id: true,
                        userName: true,
                        role: true,
                    }
                });
                return res.send(user);
            }
            catch (error) {
                return res.status(404).send("User not found");
            }
        };
        this.create = async (req, res) => {
            const { username, password, role, email, firstName, lastName } = req.body;
            const user = new user_entity_1.User();
            user.userName = username;
            user.password = password;
            user.role = role;
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            const errors = await (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            user.hashPassword();
            try {
                await this.userRepository.save(user);
            }
            catch (e) {
                res.status(409).send("Username already in use");
                return;
            }
            res.status(201).send("User created");
        };
        this.update = async (req, res) => {
            const id = req.params.id;
            const { username, role } = req.body;
            let user;
            try {
                user = await this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                });
            }
            catch (error) {
                res.status(404).send("User not found");
                return;
            }
            user.userName = username;
            user.role = role;
            const errors = await (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            try {
                await this.userRepository.save(user);
            }
            catch (e) {
                res.status(400).send("Could not update user");
                return;
            }
            res.status(204).send();
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            try {
                await this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                });
            }
            catch (error) {
                res.status(404).send("User not found");
                return;
            }
            this.userRepository.delete(id);
            res.status(204).send();
        };
        this.userRepository = user_repository_1.UserRepository;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", [checkAuth_1.checkAuth], this.index);
        this.router.get("/:id", [checkAuth_1.checkAuth, (0, checkRole_1.checkRole)(["ADMIN"])], this.getUserById);
        this.router.get("/:email", [checkAuth_1.checkAuth], this.getUserByEmail);
        this.router.post("/", [checkAuth_1.checkAuth, (0, checkRole_1.checkRole)(["ADMIN"])], this.create);
        this.router.put("/:id", [checkAuth_1.checkAuth, (0, checkRole_1.checkRole)(["ADMIN"])], this.update);
        this.router.delete("/:id", [checkAuth_1.checkAuth, (0, checkRole_1.checkRole)(["ADMIN"])], this.delete);
    }
}
exports.UserController = UserController;
