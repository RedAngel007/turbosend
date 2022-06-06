import express, { Application } from "express";
import "reflect-metadata";
import { initDB } from "./utils";
import {
   AuthController,
   UserController,
} from "./controllers";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middleware";

const port = 5000;

class Server {
   public app: Application;

   constructor() {
      this.app = express();
      this.configuration();
      this.routes();
      this.start();
   }

   public configuration() {
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(express.json());
      this.app.use(morgan('dev'))
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cookieParser());
      this.app.use(requestLogger)
   }

   public async routes() {
      initDB().then(() => {
         this.app.use('/api/auth/', new AuthController().router);
         this.app.use('/api/users/', new UserController().router);
      });
   }

   public start() {
      this.app.listen(port, () => {
         console.log(`server started at http://localhost:${port}`);
      });
   }
}

export default new Server().app;




