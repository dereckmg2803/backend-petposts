"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetPostsDto = exports.CreatePetPostSchema = void 0;
const zod_1 = require("zod");
exports.CreatePetPostSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'name is required' })
        .min(3, 'name must be at least 3 characters long')
        .max(30, 'name must be at most 30 characters long'),
    breed: zod_1.z
        .string({ required_error: 'breed is required' })
        .min(3, 'breed must be at least 3 characters long')
        .max(30, 'breed must be at most 30 characters long'),
    weight: zod_1.z
        .number({ required_error: 'weight is required' })
        .min(0.1, 'weight must be a positive number')
        .max(200, 'weight must be at most 200'),
});
class CreatePetPostsDto {
    constructor(name, breed, weight) {
        this.name = name;
        this.breed = breed;
        this.weight = weight;
    }
    static execute(input) {
        var _a, _b;
        const parseResult = exports.CreatePetPostSchema.safeParse(input);
        if (!parseResult.success) {
            const error = (_b = (_a = parseResult.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { name, breed, weight } = parseResult.data;
        return [undefined, new CreatePetPostsDto(name, breed, weight)];
    }
}
exports.CreatePetPostsDto = CreatePetPostsDto;
