"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostController = void 0;
const handleError_1 = require("../common/handleError");
const domain_1 = require("../../domain");
class PetPostController {
    constructor(creatorPetPostService, finderPetPostService, deletePetPostService, updatePetPostService, approvePetPostService, rejectPetPostService) {
        this.creatorPetPostService = creatorPetPostService;
        this.finderPetPostService = finderPetPostService;
        this.deletePetPostService = deletePetPostService;
        this.updatePetPostService = updatePetPostService;
        this.approvePetPostService = approvePetPostService;
        this.rejectPetPostService = rejectPetPostService;
        this.createPetPost = (req, res) => {
            const [error, data] = domain_1.CreatePetPostsDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    status: 'error',
                    message: error,
                });
            }
            this.creatorPetPostService
                .execute(data)
                .then((result) => res.status(201).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findAllPetPosts = (_req, res) => {
            this.finderPetPostService
                .executeByFindAll()
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findOnePetPost = (req, res) => {
            const { id } = req.params;
            this.finderPetPostService
                .executeByFindOne(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.deletePetPost = (req, res) => {
            const { id } = req.params;
            this.deletePetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.updatePetPost = (req, res) => {
            const { id } = req.params;
            const [error, data] = domain_1.UpdatePetPostDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    status: 'error',
                    message: error,
                });
            }
            this.updatePetPostService
                .execute(id, data)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.approvePetPost = (req, res) => {
            const { id } = req.params;
            this.approvePetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.rejectPetPost = (req, res) => {
            const { id } = req.params;
            this.rejectPetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
    }
}
exports.PetPostController = PetPostController;
