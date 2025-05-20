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
exports.LoginUserService = void 0;
const config_1 = require("../../../config");
const user_model_1 = require("../../../data/postgres/models/user.model");
const domain_1 = require("../../../domain");
class LoginUserService {
    execute(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ensureUserExist(credentials);
            this.ensurePasswordIsCorrect(credentials, user);
            const token = yield this.generateToken({ id: user.id }, config_1.envs.JWT_EXPIRE_IN);
            return {
                token,
                user: {
                    id: user.id,
                    fullname: user.name,
                    email: user.email,
                    rol: user.role,
                },
            };
        });
    }
    ensurePasswordIsCorrect(credentials, user) {
        const isMatch = config_1.encryptAdapter.compare(credentials.password, user.password);
        if (!isMatch) {
            throw domain_1.CustomError.unAuthorized('Invalid Credentials');
        }
    }
    ensureUserExist(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: {
                    email: credentials.email,
                    status: true,
                },
            });
            if (!user) {
                throw domain_1.CustomError.unAuthorized('Invalid Credentials');
            }
            return user;
        });
    }
    generateToken(payload, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield config_1.JwtAdapter.generateToken(payload, duration);
            if (!token)
                throw domain_1.CustomError.internalServer('Error while creating jwt');
            return token;
        });
    }
}
exports.LoginUserService = LoginUserService;
