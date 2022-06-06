import { DataSource, DataSourceOptions, Db } from "typeorm";
import { User } from "../entities/user.entity";
import { roleConstants } from "../constants/common.constants";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const connectOptions: DataSourceOptions = 
{
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USN,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    subscribers: [],
    entities: [
        process.env.NODE_ENV === "prod"
            ? "build/**/*.entity{,.js}"
            : "src/**/*.entity{.ts,.js}",
    ],
    migrations: ["src/migration/*.ts"],
}

export const DB = new DataSource(connectOptions);

export const initDB = async () => {
    return await DB.initialize();
}

export const initDBWithData = async () => {
    const db = await DB.initialize();

    //await clearDB();

    await createAdmin();

    return db;
}

export const clearDB = async () => {
    const entities = DB.entityMetadatas;

    for (const entity of entities) {
        const repository = await DB.getRepository(entity.name);

        await repository.query(`TRUNCATE "${entity.name}" RESTART IDENTITY CASCADE;`);
    }
}

export const createAdmin = async () => {
    const repository = await DB.getRepository(User);

    const user = new User();

    user.email = "test@yy.com";
    user.userName = "admin";
    user.password = "admin";

    user.role = roleConstants.admin;
    user.firstName = "admin";
    user.lastName = "admin";
    user.hashPassword();

    repository.save(user);
}

console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
export const jwtSecret = process.env.JWT_SECRET;
export const DBTYPE = process.env.DB_TYPE;
export const pg_USERNAME = process.env.DB_USN;
export const pg_PASS = process.env.DB_PWD;
export const pg_DB = process.env.JWT_SECRET;
export const pg_HOST = process.env.DB_HOST;
export const PG_PORT = Number(process.env.DB_PORT);
