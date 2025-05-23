"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const create_user_service_1 = require("./services/create-user.service");
const finder_user_service_1 = require("./services/finder-user.service");
const delete_user_service_1 = require("./services/delete-user.service");
const update_user_service_1 = require("./services/update-user.service");
const login_user_service_1 = require("./services/login-user.service");
const email_service_1 = require("../common/services/email.service");
const config_1 = require("../../config");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const data_1 = require("../../data"); // Asegúrate de importar bien esto
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_MAIL);
        const createUserService = new create_user_service_1.CreatorUserService(emailService);
        const finderUserService = new finder_user_service_1.FinderUserService();
        const deleteUserService = new delete_user_service_1.DeleteUserService(finderUserService);
        const updateUserService = new update_user_service_1.UpdateUserService(finderUserService);
        const loginUserService = new login_user_service_1.LoginUserService();
        const controller = new controller_1.UserController(createUserService, finderUserService, deleteUserService, updateUserService, loginUserService);
        // ✅ Ruta pública (no requiere login ni rol)
        router.post("/login", controller.loginUser);
        router.post("/register", controller.createUser);
        router.get("/:id", controller.findOneUser);
        router.get("/", controller.findAllUsers);
        router.get('/validate-account/:token', controller.validateAccount);
        // ✅ Rutas protegidas y con rol de ADMIN
        router.use(auth_middleware_1.AuthMiddleware.protect, auth_middleware_1.AuthMiddleware.restrictTo(data_1.UserRole.ADMIN));
        router.patch("/:id", controller.updateUser);
        router.delete("/:id", controller.deleteUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
