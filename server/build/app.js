"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const utils_1 = require("./utils");
const user_controller_1 = require("./controllers/user.controller");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const port = 5000;
class Server {
    constructor() {
        this.express = (0, express_1.default)();
        this.configuration();
        this.routes();
        this.start();
    }
    configuration() {
        this.express.use((0, cors_1.default)());
        this.express.use((0, helmet_1.default)());
        this.express.use(express_1.default.json());
    }
    async routes() {
        (0, utils_1.initDB)().then(() => {
            this.express.use(`/api/users/`, new user_controller_1.UserController().router);
        });
    }
    start() {
        this.express.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}
exports.default = new Server().express;
