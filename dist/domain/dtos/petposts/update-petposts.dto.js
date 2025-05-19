"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetPostDto = exports.UpdatePetPostSchema = void 0;
const zod_1 = require("zod");
exports.UpdatePetPostSchema = zod_1.z.object({
    pet_name: zod_1.z
        .string()
        .min(3, 'pet_name must be at least 3 characters long')
        .max(30, 'pet_name must be at most 30 characters long')
        .optional(),
    description: zod_1.z
        .string()
        .min(5, 'description must be at least 5 characters long')
        .max(500, 'description must be at most 500 characters long')
        .optional(),
    image_url: zod_1.z
        .string()
        .url('image_url must be a valid URL')
        .optional(),
    status: zod_1.z
        .enum(['lost', 'found', 'adopted'], {
        errorMap: () => ({ message: 'status must be one of: lost, found, adopted' }),
    })
        .optional(),
    hasfound: zod_1.z
        .boolean()
        .optional(),
});
class UpdatePetPostDto {
    constructor(pet_name, description, image_url, status, hasfound) {
        this.pet_name = pet_name;
        this.description = description;
        this.image_url = image_url;
        this.status = status;
        this.hasfound = hasfound;
    }
    static execute(input) {
        var _a, _b;
        const parseResult = exports.UpdatePetPostSchema.safeParse(input);
        if (!parseResult.success) {
            const error = (_b = (_a = parseResult.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { pet_name, description, image_url, status, hasfound } = parseResult.data;
        return [undefined, new UpdatePetPostDto(pet_name, description, image_url, status, hasfound)];
    }
}
exports.UpdatePetPostDto = UpdatePetPostDto;
