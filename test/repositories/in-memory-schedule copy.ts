import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { CourseRepository } from '@/domain/course/application/repositories/course-repository';
import { Course } from '@/domain/course/enterprise/entities/course';

export class InMemoryCourseRepository implements CourseRepository {
  public items: Course[] = [];

  async create(course: Course) {
    this.items.push(course);
  }

  async findMany({ page, take }: PaginationParams) {
    if (this.items.length) {
      return this?.items?.slice((page - 1) * take, take);
    }
    return [];
  }

  async findById(courseId: UniqueEntityID) {
    return this.items.find((item) => item.id?.equals(courseId)) || null;
  }
}
