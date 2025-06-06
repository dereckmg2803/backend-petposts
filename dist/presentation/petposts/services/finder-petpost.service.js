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
exports.FinderPetPostService = void 0;
const data_1 = require("../../../data");
class FinderPetPostService {
    executeByFindAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const petPosts = yield data_1.PetPost.find({
                where: {
                    status: data_1.PetPostStatus.APPROVED,
                    hasfound: false
                },
                relations: ['user'],
                select: {
                    user: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                order: {
                    created_at: 'DESC',
                },
            });
            return petPosts;
        });
    }
    executeByFindOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield data_1.PetPost.createQueryBuilder('petPost')
                .leftJoinAndSelect('petPost.user', 'user')
                .select([
                'petPost',
                'user.id',
                'user.name',
                'user.email',
                'user.role',
                'user.status'
            ])
                .where('petPost.id = :id', { id })
                .getOne();
            if (!petPost) {
                throw new Error('PetPost not found');
            }
            return petPost;
        });
    }
}
exports.FinderPetPostService = FinderPetPostService;
