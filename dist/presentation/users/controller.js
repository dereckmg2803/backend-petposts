"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const handleError_1 = require("../common/handleError");
const domain_1 = require("../../domain");
const login_user_dto_1 = require("../../domain/dtos/users/login-user.dto");
class UserController {
    constructor(creatorUserService, finderUserService, deleteUserService, updateUserService, loginUserService) {
        this.creatorUserService = creatorUserService;
        this.finderUserService = finderUserService;
        this.deleteUserService = deleteUserService;
        this.updateUserService = updateUserService;
        this.loginUserService = loginUserService;
        this.createUser = (req, res) => {
            const [error, data] = domain_1.CreateUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    status: 'error',
                    message: error,
                });
            }
            this.creatorUserService
                .execute(data)
                .then((result) => res.status(201).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.loginUser = (req, res) => {
            const [error, data] = login_user_dto_1.LoginUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.loginUserService
                .execute(data)
                .then((result) => {
                res.cookie('token', result.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 3 * 60 * 60 * 1000, // 3 horas
                });
                res.status(200).json(result);
            })
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findAllUsers = (req, res) => {
            this.finderUserService
                .executeByFindAll()
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findOneUser = (req, res) => {
            const { id } = req.params;
            this.finderUserService
                .executeByFindOne(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.deleteUser = (req, res) => {
            const { id } = req.params;
            this.deleteUserService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.updateUser = (req, res) => {
            const { id } = req.params;
            const [error, data] = domain_1.UpdateUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    status: 'error',
                    message: error,
                });
            }
            this.updateUserService
                .execute(id, data)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.validateAccount = (req, res) => {
            const { token } = req.params;
            console.log('Validando cuenta');
            console.log(token);
            this.creatorUserService
                .validateAccount(token)
                .then((message) => res.status(201).json({ message }))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
    }
}
exports.UserController = UserController;
