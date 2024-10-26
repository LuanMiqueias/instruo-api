import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '../../enterprise/entities/student';

export abstract class StudentRepository {
  abstract create(student: Student): Promise<void>;
  abstract findById(id: UniqueEntityID): Promise<Student | null>;
  abstract findByEmail(email: string): Promise<Student | null>;
}
