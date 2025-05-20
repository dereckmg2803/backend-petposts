"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostMiddleware = void 0;
const petpost_model_1 = require("../../../data/postgres/models/petpost.model"); // Ajusta según tu estructura
const data_1 = require("../../../data");
class PetPostMiddleware {
    static checkOwnershipOrAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.sessionUser;
            console.log("👤 Usuario en middleware:", user);
            try {
                const petPost = yield petpost_model_1.PetPost.findOne({ where: { id } });
                if (!petPost) {
                    return res.status(404).json({ message: "Publicación no encontrada" });
                }
                // Si es el dueño o es admin, sigue
                if (petPost.owner === user.id || user.role === data_1.UserRole.ADMIN) {
                    return next();
                }
                return res.status(403).json({ message: "No tienes permiso para esta acción" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
}
exports.PetPostMiddleware = PetPostMiddleware;
