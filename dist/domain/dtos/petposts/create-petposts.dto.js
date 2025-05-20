"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetPostDto = exports.CreatePetPostSchema = void 0;
const zod_1 = require("zod");
const data_1 = require("../../../data");
exports.CreatePetPostSchema = zod_1.z.object({
    pet_name: zod_1.z
        .string({ required_error: 'pet_name is required' })
        .min(3, 'pet_name must be at least 3 characters long')
        .max(50, 'pet_name must be at most 50 characters long'),
    description: zod_1.z
        .string({ required_error: 'description is required' })
        .min(10, 'description must be at least 10 characters long'),
    image_url: zod_1.z
        .string({ required_error: 'image_url is required' })
        .url('image_url must be a valid URL'),
    owner: zod_1.z
        .string({ required_error: 'owner is required' })
        .min(3, 'owner must be at least 3 characters long'),
    status: zod_1.z
        .nativeEnum(data_1.PetPostStatus)
        .optional() // opcional porque puede quedar en default: pending
    ,
    hasfound: zod_1.z
        .boolean()
        .optional() // opcional porque puede quedar como default: false
});
class CreatePetPostDto {
    constructor(pet_name, description, image_url, owner, status = data_1.PetPostStatus.PENDING, hasfound = false) {
        this.pet_name = pet_name;
        this.description = description;
        this.image_url = image_url;
        this.owner = owner;
        this.status = status;
        this.hasfound = hasfound;
    }
    static execute(input) {
        var _a, _b;
        const parseResult = exports.CreatePetPostSchema.safeParse(input);
        if (!parseResult.success) {
            const error = (_b = (_a = parseResult.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { pet_name, description, image_url, owner, status, hasfound } = parseResult.data;
        return [undefined, new CreatePetPostDto(pet_name, description, image_url, owner, status !== null && status !== void 0 ? status : data_1.PetPostStatus.PENDING, hasfound !== null && hasfound !== void 0 ? hasfound : false)];
    }
}
exports.CreatePetPostDto = CreatePetPostDto;
