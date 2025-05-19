"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'name is required' })
        .min(3, 'name must be at least 3 characters long')
        .max(50, 'name must be at most 50 characters long'),
    email: zod_1.z
        .string({ required_error: 'email is required' })
        .email('email must be a valid email address'),
    password: zod_1.z
        .string({ required_error: 'password is required' })
        .min(6, 'password must be at least 6 characters long')
        .max(100, 'password must be at most 100 characters long'),
});
class CreateUserDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static execute(input) {
        var _a, _b;
        const parseResult = exports.CreateUserSchema.safeParse(input);
        if (!parseResult.success) {
            const error = (_b = (_a = parseResult.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { name, email, password } = parseResult.data;
        return [undefined, new CreateUserDto(name, email, password)];
    }
}
exports.CreateUserDto = CreateUserDto;
