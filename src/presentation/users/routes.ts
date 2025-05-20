import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/create-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { UpdateUserService } from "./services/update-user.service";
import { LoginUserService } from "./services/login-user.service";
import { EmailService } from "../common/services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../common/middlewares/auth.middleware";
import { UserRole } from "../../data"; // Asegúrate de importar bien esto

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );

    const createUserService = new CreatorUserService(emailService);
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

    // ✅ Ruta pública (no requiere login ni rol)
    router.post("/login", controller.loginUser);
    router.post("/register", controller.createUser);
    router.get("/:id", controller.findOneUser);
    router.patch("/:id", controller.updateUser);
    // ✅ Rutas protegidas y con rol de ADMIN
    router.use(AuthMiddleware.protect, AuthMiddleware.restrictTo(UserRole.ADMIN));
    router.get("/", controller.findAllUsers);
    router.delete("/:id", controller.deleteUser);

    return router;
  }
}
