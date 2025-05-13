import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/create-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { UpdateUserService } from "./services/update-user.service";
import { LoginUserService } from "./services/login-user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const createUserService = new CreatorUserService();
    const finderUserService = new FinderUserService();
    const deleteUserService = new DeleteUserService(finderUserService);
    const updateUserService = new UpdateUserService(finderUserService);
    const loginUserService = new LoginUserService();

    const controller = new UserController(
      createUserService,
      finderUserService,
      deleteUserService,
      updateUserService,
      loginUserService
    );

    // 🔹 Rutas
    router.get("/", controller.findAllUsers);
    router.post("/", controller.createUser);
    router.get("/:id", controller.findOneUser);
    router.patch("/:id", controller.updateUser);
    router.delete("/:id", controller.deleteUser);

    // 🔹 Ruta de login
    router.post("/login", controller.loginUser);

    return router;
  }
}
