import { InMemoryInstructorRepository } from 'test/repositories/in-memory-instructor';
import { RegisterInstructorUseCase } from '../instructor/register-instructor';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryCourseRepository } from 'test/repositories/in-memory-schedule copy';
import { CreateCourseUseCase } from './create-course';

let inMemoryCourseRepository: InMemoryCourseRepository;
let inMemoryInstructorRepository: InMemoryInstructorRepository;

let sut: CreateCourseUseCase;
let registerInstructorUseCase: RegisterInstructorUseCase;

describe('Create Course', () => {
  beforeEach(() => {
    inMemoryCourseRepository = new InMemoryCourseRepository();
    inMemoryInstructorRepository = new InMemoryInstructorRepository();

    registerInstructorUseCase = new RegisterInstructorUseCase(
      inMemoryInstructorRepository,
    );

    sut = new CreateCourseUseCase(
      inMemoryCourseRepository,

      inMemoryInstructorRepository,
    );
  });

  it('should be able to create course with no instructors', async () => {
    const { course } = await sut.execute({
      name: `Course 01`,
      description: 'Description Course',
    });

    expect(course).toEqual(
      expect.objectContaining({
        name: `Course 01`,
        description: 'Description Course',
      }),
    );
  });

  it('should be able to create course with two instructors', async () => {
    const { instructor: instructor01 } =
      await registerInstructorUseCase.execute({
        name: 'John Doe 1',
        email: 'johndoe1@example.com',
        password: '123456',
        courseId: new UniqueEntityID(),
      });
    const { instructor: instructor02 } =
      await registerInstructorUseCase.execute({
        name: 'John Doe 2',
        email: 'johndoe2@example.com',
        password: '123456',
        courseId: new UniqueEntityID(),
      });

    const { course } = await sut.execute({
      name: `Course 01`,
      description: 'Description Course',
      instructorsId: [instructor01?.id, instructor02?.id],
    });

    expect(course).toEqual(
      expect.objectContaining({
        name: `Course 01`,
        description: 'Description Course',
        instructors: [instructor01, instructor02],
      }),
    );
  });
});
