import { PetPost, PetPostStatus } from '../../../data';

export class FinderPetPostService {
  async executeByFindAll() {
    const petPosts = await PetPost.find({
      where: {
        status: PetPostStatus.APPROVED,
        hasfound: false
      },
      order: {
        created_at: 'DESC',
      },
    });

    return petPosts;
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id
      },
    });

    if (!petPost) {
      throw new Error('PetPost not found');
    }

    return petPost;
  }


}
