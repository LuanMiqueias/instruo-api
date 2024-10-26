import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InstructorRepository } from '@/domain/course/application/repositories/instructor-repository';
import { Instructor } from '@/domain/course/enterprise/entities/instructor';

export class InMemoryInstructorRepository implements InstructorRepository {
  public items: Instructor[] = [];

  async create(instructor: Instructor) {
    this.items.push(instructor);
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item?.email === email) || null;
  }

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id?.equals(id)) || null;
  }

  async findManyById(instructorIds: UniqueEntityID[]) {
    const instructors: Instructor[] = [];

    instructorIds.forEach((intructorId) => {
      const instructor = this.items.find(({ id }) => intructorId.equals(id));
      instructor && instructors.push(instructor);
    });

    return instructors;
  }
}
