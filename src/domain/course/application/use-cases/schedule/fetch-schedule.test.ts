import { InMemoryInstructorRepository } from 'test/repositories/in-memory-instructor';
import { InMemoryScheduleRepository } from 'test/repositories/in-memory-schedule';
import { FetchScheduleUseCase } from './fetch-schedules';
import { CreateScheduleUseCase } from '../instructor/create-schedule';
import { RegisterInstructorUseCase } from '../instructor/register-instructor';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryScheduleRepository: InMemoryScheduleRepository;
let inMemoryInstructorRepository: InMemoryInstructorRepository;

let sut: FetchScheduleUseCase;
let createScheduleUseCase: CreateScheduleUseCase;
let registerInstructorUseCase: RegisterInstructorUseCase;

describe('Fetch Schedules', () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    inMemoryInstructorRepository = new InMemoryInstructorRepository();

    createScheduleUseCase = new CreateScheduleUseCase(
      inMemoryInstructorRepository,
      inMemoryScheduleRepository,
    );
    registerInstructorUseCase = new RegisterInstructorUseCase(
      inMemoryInstructorRepository,
    );

    sut = new FetchScheduleUseCase(inMemoryScheduleRepository);
  });

  it('should be able to fetch schedules', async () => {
    const { instructor } = await registerInstructorUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      courseId: new UniqueEntityID(),
    });

    await Promise.all(
      Array.from({ length: 11 }, (_, index) =>
        createScheduleUseCase.execute({
          courseId: new UniqueEntityID(),
          name: `test ${index}`,
          description: '12356',
          instructorId: instructor.id,
          scheduledAt: new Date(),
        }),
      ),
    );

    const { schedules } = await sut.execute({
      page: 1,
      take: 5,
    });

    expect(schedules).toHaveLength(5);
  });
});
