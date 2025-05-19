import { z } from 'zod';

export const CreatePetPostSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(3, 'name must be at least 3 characters long')
    .max(30, 'name must be at most 30 characters long'),

  breed: z
    .string({ required_error: 'breed is required' })
    .min(3, 'breed must be at least 3 characters long')
    .max(30, 'breed must be at most 30 characters long'),

  weight: z
    .number({ required_error: 'weight is required' })
    .min(0.1, 'weight must be a positive number')
    .max(200, 'weight must be at most 200'),
});

export class CreatePetPostsDto {
  constructor(
    public readonly name: string,
    public readonly breed: string,
    public readonly weight: number
  ) { }

  static execute(input: { [key: string]: any }): [string?, CreatePetPostsDto?] {
    const parseResult = CreatePetPostSchema.safeParse(input);

    if (!parseResult.success) {
      const error = parseResult.error.errors[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { name, breed, weight } = parseResult.data;
    return [undefined, new CreatePetPostsDto(name, breed, weight)];
  }
}

