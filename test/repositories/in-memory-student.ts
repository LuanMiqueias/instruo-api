import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { StudentRepository } from '@/domain/course/application/repositories/student-repository';
import { Student } from '@/domain/course/enterprise/entities/student';

export class InMemoryStudentRepository implements StudentRepository {
  public items: Student[] = [];

  async create(student: Student) {
    this.items.push(student);
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item?.email === email) || null;
  }

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id?.equals(id)) || null;
  }
}
