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
exports.AuthMiddleware = void 0;
const config_1 = require("../../../config");
const user_model_1 = require("../../../data/postgres/models/user.model");
class AuthMiddleware {
    static protect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            try {
                const payload = (yield config_1.JwtAdapter.validateToken(token));
                if (!payload) {
                    return res.status(401).json({ message: 'Invalid Token!' });
                }
                const user = yield user_model_1.User.findOne({
                    where: {
                        id: payload.id,
                        status: true,
                    },
                });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid user' });
                }
                // ✅ Guardamos el usuario en una propiedad personalizada
                req.sessionUser = user;
                next();
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Something went very wrong 😢' });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.restrictTo = (...roles) => {
    return (req, res, next) => {
        const sessionUser = req.sessionUser;
        console.log('🧠 RestrictTo Debug');
        console.log('Usuario:', sessionUser);
        console.log('Rol requerido:', roles);
        if (!sessionUser || !roles.includes(sessionUser.role)) {
            return res.status(403).json({
                message: 'You are not authorized to access this route',
            });
        }
        next();
    };
};
