import { FinderPetPostService } from './finder-petpost.service';
import { PetPostStatus } from '../../../data';

export class DeletePetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) { }

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.status = PetPostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'PetPost deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting PetPost:', error);
      throw new Error('Failed to delete PetPost');
    }
  }
}
