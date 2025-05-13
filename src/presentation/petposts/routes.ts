// routes.ts
import { Router } from "express";
import { PetPostController } from "./controller";
import { CreatorPetPostService } from './services/create-petpost.service';
import { FinderPetPostService } from './services/finder-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';

export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const createPetPostService = new CreatorPetPostService();
    const finderPetPostService = new FinderPetPostService();
    const deletePetPostService = new DeletePetPostService(finderPetPostService);
    const updatePetPostService = new UpdatePetPostService(finderPetPostService);

    const controller = new PetPostController(
      createPetPostService,
      finderPetPostService,
      deletePetPostService,
      updatePetPostService
    );

    router.get("/", controller.findAllPetPosts);
    router.post("/", controller.createPetPost);
    router.get("/:id", controller.findOnePetPost);
    router.patch("/:id", controller.updatePetPost);
    router.delete("/:id", controller.deletePetPost);

    // Agregando rutas para aprobar y rechazar
    router.patch("/:id/approve", controller.approvePetPost);
    router.patch("/:id/reject", controller.rejectPetPost);

    return router;
  }
}
