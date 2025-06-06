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
exports.CreatorPetPostService = void 0;
const data_1 = require("../../../data");
class CreatorPetPostService {
    constructor(finderUserService) {
        this.finderUserService = finderUserService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.finderUserService.executeByFindOne(data.owner);
            const petPost = new data_1.PetPost();
            petPost.pet_name = data.pet_name;
            petPost.description = data.description;
            petPost.image_url = data.image_url || 'https://example.com/default-image.jpg';
            petPost.status = data.status || data_1.PetPostStatus.PENDING;
            petPost.user = user;
            petPost.hasfound = data.hasfound || false;
            try {
                yield petPost.save();
                return {
                    message: 'PetPost created successfully',
                };
            }
            catch (error) {
                console.error('Error creating PetPost:', error);
                throw new Error('Failed to create PetPost');
            }
        });
    }
}
exports.CreatorPetPostService = CreatorPetPostService;
