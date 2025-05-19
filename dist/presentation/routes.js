"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./petposts/routes");
const routes_2 = require("./users/routes"); // Importar las rutas de usuarios
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Rutas de mascotas
        router.use("/api/v1/petposts", routes_1.PetPostRoutes.routes);
        // Rutas de usuarios
        router.use("/api/v1/users", routes_2.UserRoutes.routes); // Añadir ruta de usuarios
        // Puedes agregar más rutas aquí, como la de los doctores si es necesario
        // router.use("/api/v1/doctors", DoctorRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
