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
exports.UpdateUserService = void 0;
class UpdateUserService {
    constructor(finderUserService) {
        this.finderUserService = finderUserService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.finderUserService.executeByFindOne(id);
            user.name = data.name;
            user.email = data.email;
            user.password = data.password; // Asegúrate de cifrar la contraseña antes de guardar
            user.role = data.role;
            user.status = data.status;
            try {
                yield user.save();
                return {
                    message: "User updated successfully",
                };
            }
            catch (error) {
                console.error("Error updating user:", error);
                throw new Error("Failed to update user");
            }
        });
    }
}
exports.UpdateUserService = UpdateUserService;
