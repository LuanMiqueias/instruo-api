import { PaginationParams } from '@/core/repositories/pagination-params';
import { Course } from '../../enterprise/entities/course';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export abstract class CourseRepository {
  abstract create(course: Course): Promise<void>;
  abstract findMany(params: PaginationParams): Promise<Course[]>;
  abstract findById(courseId: UniqueEntityID): Promise<Course | null>;
}
