import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/create-petpost.service';
import { FinderPetPostService } from './services/finder-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';
import { PetPostStatus } from '../../data/postgres/models/petpost.model';  // Asegúrate de que la ruta sea correcta según tu estructura de carpetas


export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly deletePetPostService: DeletePetPostService,
    private readonly updatePetPostService: UpdatePetPostService
  ) { }

  createPetPost = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorPetPostService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };

  findAllPetPosts = (_req: Request, res: Response) => {
    this.finderPetPostService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };

  findOnePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetPostService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(404).json({ message: error.message }));
  };

  deletePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deletePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };

  updatePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updatePetPostService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };

  // Método para aprobar un PetPost
  approvePetPost = async (req: Request, res: Response) => {
    try {
      const petPostId = req.params.id;
      const petPost = await this.finderPetPostService.executeByFindOne(petPostId);
      if (!petPost) {
        return res.status(404).json({ message: 'PetPost not found' });
      }

      petPost.status = PetPostStatus.APPROVED;
      await petPost.save();
      res.status(200).json({ message: 'PetPost approved', petPost });
    } catch (error) {
      res.status(500).json({ message: 'Error approving pet post', error });
    }
  };


  // Método para rechazar un PetPost
  rejectPetPost = async (req: Request, res: Response) => {
    try {
      const petPostId = req.params.id;
      const petPost = await this.finderPetPostService.executeByFindOne(petPostId);
      if (!petPost) {
        return res.status(404).json({ message: 'PetPost not found' });
      }

      petPost.status = PetPostStatus.REJECTED;
      await petPost.save();
      res.status(200).json({ message: 'PetPost rejected', petPost });
    } catch (error) {
      res.status(500).json({ message: 'Error rejecting pet post', error });
    }
  };



}
