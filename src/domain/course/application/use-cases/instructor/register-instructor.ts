import { Instructor } from '@/domain/course/enterprise/entities/instructor';
import { InstructorRepository } from '../../repositories/instructor-repository';
import { InstructorAlreadyExistsError } from '../errors/instructor-already-exists';

interface RegisterInstructorUseCaseRequest {
  name: string;
  email: string;
  password: string;
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
  }: RegisterInstructorUseCaseRequest): Promise<RegisterInstructorUseCaseResponse> {
    const instructor = Instructor.create({
      name,
      email,
      password,
    });
    const instructorWithSameEmail = await this.instructorRepository.findByEmail(email)

    if(instructorWithSameEmail){
      throw new InstructorAlreadyExistsError(email)
    }
    
    await this.instructorRepository.create(instructor);

    return { instructor };
  }
}
