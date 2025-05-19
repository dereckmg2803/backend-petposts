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
exports.CreatorUserService = void 0;
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class CreatorUserService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new data_1.User();
            user.name = data.name;
            user.email = data.email;
            user.password = bcrypt_adapter_1.encryptAdapter.hash(data.password); // Asegúrate de hashearla si es necesario
            user.role = data.role || "user";
            try {
                yield user.save();
                return {
                    message: "User created successfully",
                };
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw domain_1.CustomError.internalServer("Error creating user");
            }
        });
    }
}
exports.CreatorUserService = CreatorUserService;
