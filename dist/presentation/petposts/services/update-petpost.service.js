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
exports.UpdatePetPostService = void 0;
class UpdatePetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            petPost.pet_name = (_a = data.pet_name) !== null && _a !== void 0 ? _a : petPost.pet_name;
            petPost.description = (_b = data.description) !== null && _b !== void 0 ? _b : petPost.description;
            petPost.image_url = (_c = data.image_url) !== null && _c !== void 0 ? _c : petPost.image_url;
            petPost.status = (_d = data.status) !== null && _d !== void 0 ? _d : petPost.status;
            petPost.hasfound = (_e = data.hasfound) !== null && _e !== void 0 ? _e : petPost.hasfound;
            try {
                yield petPost.save();
                return {
                    message: 'PetPost updated successfully',
                };
            }
            catch (error) {
                console.error('Error updating PetPost:', error);
                throw new Error('Failed to update PetPost');
            }
        });
    }
}
exports.UpdatePetPostService = UpdatePetPostService;
