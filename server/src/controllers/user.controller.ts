import { validate } from "class-validator";
import { Router, Response, Request } from "express";
import { User } from "../entities/user.entity";
import { checkAuth } from "../middleware/checkAuth";
import { checkRole } from "../middleware/checkRole";

import { UserRepository } from "../repository/user.repository";

export class UserController {
  public router: Router;

  public userRepository: typeof UserRepository;


  /**
   *
   */
  constructor() {
    this.userRepository = UserRepository;
    this.router = Router();
    this.routes();
  }

  public getUserByEmail = async (email: string): Promise<User> | null => {
    if (!email.isNullOrEmpty()) {
      const user = await UserRepository.findOneOrFail({ where: { email: email } });
      return user;
    }

    return null;
  }

  public index = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepository.find({});
      return res.send(users);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getUserById = async (req: Request, res: Response) => {
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
    } catch (error) {
      return res.status(404).send("User not found");
    }
  };

  public create = async (req: Request, res: Response) => {
    console.log('req.body', req.body)

    const { username, password, role, email, firstName, lastName } = req.body;
    const user = new User();
    user.userName = username;
    user.password = password;
    user.role = role === "" ? 'user' : role;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    try {
      await this.userRepository.save(user);
    } catch (e) {
      res.status(409).send("Username already in use");
      return;
    }

    res.status(201).send("User created");
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;

    const { username, role } = req.body;

    let user;
    try {
      user = await this.userRepository.findOneOrFail({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    user.userName = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await this.userRepository.save(user);
    } catch (e) {
      res.status(400).send("Could not update user");
      return;
    }
    res.status(204).send();
  };

  public delete = async (req: Request, res: Response) => {
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

  public routes() {
    this.router.get("/", this.index);
    this.router.get("/:id", [checkAuth, checkRole(["ADMIN"])], this.getUserById);
    this.router.get("/:email", [checkAuth], this.getUserByEmail);
    this.router.post("/register/", this.create);
    this.router.put("/:id", [checkAuth, checkRole(["ADMIN"])], this.update);
    this.router.delete("/:id", [checkAuth, checkRole(["ADMIN"])], this.delete);
  }
}