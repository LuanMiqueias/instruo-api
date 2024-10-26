import { Student } from '@/domain/course/enterprise/entities/student';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { StudentAlreadyExistsError } from '../errors/student-already-exists';
import { StudentRepository } from '../../repositories/student-repository';

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterStudentUseCaseResponse {
  student: Student;
}

export class RegisterStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const student = Student.create({
      name,
      email,
      password,
    });

    const studentWithSameEmail =
      await this.studentRepository.findByEmail(email);

    if (studentWithSameEmail) {
      throw new StudentAlreadyExistsError(email);
    }

    await this.studentRepository.create(student);

    return { student };
  }
}
