"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.createAdmin = exports.clearDB = exports.initDBWithData = exports.initDB = exports.DB = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const common_constants_1 = require("../constants/common.constants");
const connectOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "my_user",
    password: "root",
    database: "wyrenaija",
    synchronize: true,
    logging: false,
    subscribers: [],
    entities: [
        process.env.NODE_ENV === "prod"
            ? "build/**/*.entity{,.js}"
            : "src/**/*.entity{.ts,.js}",
    ],
    migrations: ["src/migration/*.ts"],
};
exports.DB = new typeorm_1.DataSource(connectOptions);
const initDB = async () => {
    return await exports.DB.initialize();
};
exports.initDB = initDB;
const initDBWithData = async () => {
    const db = await exports.DB.initialize();
    //await clearDB();
    await (0, exports.createAdmin)();
    return db;
};
exports.initDBWithData = initDBWithData;
const clearDB = async () => {
    const entities = exports.DB.entityMetadatas;
    for (const entity of entities) {
        const repository = await exports.DB.getRepository(entity.name);
        await repository.query(`TRUNCATE "${entity.name}" RESTART IDENTITY CASCADE;`);
    }
};
exports.clearDB = clearDB;
const createAdmin = async () => {
    const repository = await exports.DB.getRepository(user_entity_1.User);
    const user = new user_entity_1.User();
    user.email = "test@yy.com";
    user.userName = "admin";
    user.password = "admin";
    user.role = common_constants_1.roleConstants.admin;
    user.firstName = "admin";
    user.lastName = "admin";
    user.hashPassword();
    repository.save(user);
};
exports.createAdmin = createAdmin;
exports.jwtSecret = process.env.JWT_SECRET;
