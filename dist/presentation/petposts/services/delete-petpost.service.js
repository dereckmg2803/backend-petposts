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
exports.DeletePetPostService = void 0;
const data_1 = require("../../../data");
class DeletePetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            try {
                yield data_1.PetPost.remove(petPost); // 🔥 eliminación física
                return {
                    message: 'PetPost deleted successfully',
                };
            }
            catch (error) {
                console.error('Error deleting PetPost:', error);
                throw new Error('Failed to delete PetPost');
            }
        });
    }
}
exports.DeletePetPostService = DeletePetPostService;
