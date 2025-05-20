"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostRoutes = void 0;
// routes.ts
const express_1 = require("express");
const controller_1 = require("./controller");
const create_petpost_service_1 = require("./services/create-petpost.service");
const finder_petpost_service_1 = require("./services/finder-petpost.service");
const delete_petpost_service_1 = require("./services/delete-petpost.service");
const update_petpost_service_1 = require("./services/update-petpost.service");
const approve_petpost_service_1 = require("./services/approve-petpost.service");
const reject_petpost_service_1 = require("./services/reject-petpost.service");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const data_1 = require("../../data");
const petpost_middleware_1 = require("../common/middlewares/petpost.middleware");
class PetPostRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const createPetPostService = new create_petpost_service_1.CreatorPetPostService();
        const finderPetPostService = new finder_petpost_service_1.FinderPetPostService();
        const deletePetPostService = new delete_petpost_service_1.DeletePetPostService(finderPetPostService);
        const updatePetPostService = new update_petpost_service_1.UpdatePetPostService(finderPetPostService);
        const approvePetPostService = new approve_petpost_service_1.ApprovePetPostService(finderPetPostService);
        const rejectPetPostService = new reject_petpost_service_1.RejectPetPostService(finderPetPostService);
        const controller = new controller_1.PetPostController(createPetPostService, finderPetPostService, deletePetPostService, updatePetPostService, approvePetPostService, rejectPetPostService);
        router.get('/', controller.findAllPetPosts);
        router.get("/:id", controller.findOnePetPost);
        // Rutas solo para usuarios autenticados normales
        router.post("/", auth_middleware_1.AuthMiddleware.restrictTo(data_1.UserRole.USER), controller.createPetPost);
        router.use("/:id", auth_middleware_1.AuthMiddleware.protect, petpost_middleware_1.PetPostMiddleware.checkOwnershipOrAdmin);
        router.patch("/:id", controller.updatePetPost);
        router.delete("/:id", controller.deletePetPost);
        // Rutas solo para admins
        router.use(auth_middleware_1.AuthMiddleware.protect, auth_middleware_1.AuthMiddleware.restrictTo(data_1.UserRole.ADMIN));
        router.patch("/:id/approve", controller.approvePetPost);
        router.patch("/:id/reject", controller.rejectPetPost);
        return router;
    }
}
exports.PetPostRoutes = PetPostRoutes;
