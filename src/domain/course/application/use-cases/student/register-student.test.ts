import { InMemoryStudentRepository } from 'test/repositories/in-memory-student';
import { RegisterStudentUseCase } from './register-student';
import { StudentAlreadyExistsError } from '../errors/student-already-exists';

let inMemoryStudentRepository: InMemoryStudentRepository;

let sut: RegisterStudentUseCase;

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();

    sut = new RegisterStudentUseCase(inMemoryStudentRepository);
  });

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result).toEqual({
      student: inMemoryStudentRepository.items[0],
    });
  });

  it('it should not be possible to register a new student if the email has been registered', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(StudentAlreadyExistsError);
  });
});
