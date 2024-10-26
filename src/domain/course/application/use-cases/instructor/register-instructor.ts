import { Instructor } from '@/domain/course/enterprise/entities/instructor';
import { InstructorAlreadyExistsError } from '../errors/instructor-already-exists';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InstructorRepository } from '../../repositories/instructor-repository';

interface RegisterInstructorUseCaseRequest {
  name: string;
  email: string;
  password: string;
  courseId: UniqueEntityID;
}

interface RegisterInstructorUseCaseResponse {
  instructor: Instructor;
}

export class RegisterInstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async execute({
    name,
    email,
    password,
    courseId,
  }: RegisterInstructorUseCaseRequest): Promise<RegisterInstructorUseCaseResponse> {
    const instructor = Instructor.create({
      name,
      email,
      password,
      courseId,
    });

    const instructorWithSameEmail =
      await this.instructorRepository.findByEmail(email);

    if (instructorWithSameEmail) {
      throw new InstructorAlreadyExistsError(email);
    }

    await this.instructorRepository.create(instructor);

    return { instructor };
  }
}
