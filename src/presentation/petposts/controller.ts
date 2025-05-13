import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/create-petpost.service';
import { FinderPetPostService } from './services/finder-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';
import { ApprovePetPostService } from './services/approve-petpost.service';
import { RejectPetPostService } from './services/reject-petpost.service';


export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly deletePetPostService: DeletePetPostService,
    private readonly updatePetPostService: UpdatePetPostService,
    private readonly approvePetPostService: ApprovePetPostService,
    private readonly rejectPetPostService: RejectPetPostService
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

  approvePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.approvePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };

  rejectPetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.rejectPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ message: error.message }));
  };




}
