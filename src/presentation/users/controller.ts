import { Request, Response } from "express";
import { CreatorUserService } from "./services/create-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { UpdateUserService } from "./services/update-user.service";
import { LoginUserService } from "./services/login-user.service";

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly finderUserService: FinderUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly loginUserService: LoginUserService
  ) { }

  createUser = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorUserService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json(error));
  };

  loginUser = (req: Request, res: Response) => {
    this.loginUserService
      .execute()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  }

  findAllUsers = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findOneUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deleteUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updateUserService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };


}
