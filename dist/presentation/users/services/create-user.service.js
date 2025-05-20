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
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class CreatorUserService {
    constructor(emailService) {
        this.emailService = emailService;
        this.sendLinkToEmailFronValidationAccount = (email) => __awaiter(this, void 0, void 0, function* () {
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ email }, '300s');
            if (!token)
                throw domain_1.CustomError.internalServer('Error gettin token');
            const link = `http://localhost:3000/api/v1/users/validate-account/${token}`;
            const html = `
      <h1>Validate Your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;
            const isSent = yield this.emailService.sendEmail({
                to: email,
                subject: 'Validate your account!',
                htmlBody: html,
            });
            if (!isSent)
                throw domain_1.CustomError.internalServer('Error sending email');
            return true;
        });
        this.validateAccount = (token) => __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.validateToken(token);
            const { email } = payload;
            if (!email)
                throw domain_1.CustomError.internalServer('Email not found in token');
            const user = yield this.ensureUserExistWhitEmail(email);
            user.status = true;
            try {
                yield user.save();
                return 'user activated';
            }
            catch (error) {
                throw domain_1.CustomError.internalServer('Something went very wrong');
            }
        });
    }
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
    ensureUserExistWhitEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_1.User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw domain_1.CustomError.internalServer('Email no registered in db');
            }
            return user;
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.badRequest('Invalid Token');
            return payload;
        });
    }
}
exports.CreatorUserService = CreatorUserService;
