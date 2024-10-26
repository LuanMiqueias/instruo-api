import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Instructor } from '../../enterprise/entities/instructor';

export abstract class InstructorRepository {
  abstract create(instructor: Instructor): Promise<void>;
  abstract findById(id: UniqueEntityID): Promise<Instructor | null>;
  abstract findManyById(
    instructorIds: UniqueEntityID[],
  ): Promise<Instructor[] | null>;
  abstract findByEmail(email: string): Promise<Instructor | null>;
}
