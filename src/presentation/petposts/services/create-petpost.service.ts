import { PetPost, PetPostStatus } from '../../../data';

export class CreatorPetPostService {
  async execute(data: any) {
    if (!data.owner) {
      throw new Error('Missing required field: owner');
    }

    const petPost = new PetPost();
    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.image_url = data.image_url || 'https://example.com/default-image.jpg';
    petPost.status = data.status || PetPostStatus.PENDING;
    petPost.owner = data.owner;
    petPost.hasfound = data.hasfound || false;

    try {
      await petPost.save();
      return {
        message: 'PetPost created successfully',
      };
    } catch (error) {
      console.error('Error creating PetPost:', error);
      throw new Error('Failed to create PetPost');
    }
  }
}
