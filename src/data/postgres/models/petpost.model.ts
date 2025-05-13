import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum PetPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  pet_name!: string;

  @Column('text', {
    nullable: false,
  })
  description!: string;

  @Column('varchar', {
    nullable: false,
  })
  image_url!: string;

  @Column('enum', {
    enum: PetPostStatus,
    default: PetPostStatus.PENDING,
    nullable: false,
  })
  status!: PetPostStatus;

  @Column('varchar', {
    nullable: false,
  })
  owner!: string; // puede ser ID de usuario, email o nombre (ajustar según tu diseño)

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  hasfound!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
