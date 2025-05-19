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
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const createUserService = new create_user_service_1.CreatorUserService();
        const finderUserService = new finder_user_service_1.FinderUserService();
        const deleteUserService = new delete_user_service_1.DeleteUserService(finderUserService);
        const updateUserService = new update_user_service_1.UpdateUserService(finderUserService);
        const loginUserService = new login_user_service_1.LoginUserService();
        const controller = new controller_1.UserController(createUserService, finderUserService, deleteUserService, updateUserService, loginUserService);
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
exports.UserRoutes = UserRoutes;
