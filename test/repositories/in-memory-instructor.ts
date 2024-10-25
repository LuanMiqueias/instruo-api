import { InstructorRepository } from "@/domain/course/application/repositories/instructor-repository"
import { Instructor } from "@/domain/course/enterprise/entities/instructor"

export class InMemoryInstructorRepository implements InstructorRepository {
  public items: Instructor[] = []

  async create(instructor: Instructor) {
    this.items.push(instructor)
  }

  async findByEmail(email: string) {
    return this.items.find(item => item.email === email) || null
  }
}
