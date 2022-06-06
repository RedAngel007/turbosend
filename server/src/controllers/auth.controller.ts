import { Router, Response, Request } from "express";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils";
import { validate } from "class-validator";

export class AuthController {
    public router: Router;
    private userRepository: typeof UserRepository;

    constructor() {
        this.userRepository = UserRepository;
        this.router = Router();
        this.routes();
    }

    public login = async (req: Request, res: Response) => {
        console.log('req.body',req.body)
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        let user: User;
        try {
            user = await this.userRepository.findOneOrFail({ where: { userName: username } });
        } catch (error) {
            return res.status(401).send();
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send();
        }

        const token = jwt.sign(
            { userId: user.id, username: user.userName },
            jwtSecret,
            { expiresIn: "1h" }
        );

        const response = {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            token
        }

        res.send(response);
    };
    
    public changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;

        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        let user: User;
        try {
            user = await this.userRepository.findOneOrFail(id);
        } catch (id) {
            return res.status(401).send();
        }

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return res.status(401).send();
        }

        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        user.hashPassword();
        this.userRepository.save(user);

        res.status(204).send();
    };

    public routes() {
        this.router.post("/login/", this.login);
    }
}
