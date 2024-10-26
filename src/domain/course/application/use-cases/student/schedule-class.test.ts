import { InMemoryInstructorRepository } from 'test/repositories/in-memory-instructor';
import { InMemoryScheduleRepository } from 'test/repositories/in-memory-schedule';
import { CreateScheduleUseCase } from '../instructor/create-schedule';
import { RegisterInstructorUseCase } from '../instructor/register-instructor';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ScheduleClassUseCase } from './schedule-class';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student';
import { RegisterStudentUseCase } from './register-student';

let inMemoryScheduleRepository: InMemoryScheduleRepository;
let inMemoryInstructorRepository: InMemoryInstructorRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;

let sut: ScheduleClassUseCase;
let createScheduleUseCase: CreateScheduleUseCase;
let registerInstructorUseCase: RegisterInstructorUseCase;
let registerStudentUseCase: RegisterStudentUseCase;

describe('Schedule Class', () => {
  beforeEach(() => {
    inMemoryScheduleRepository = new InMemoryScheduleRepository();
    inMemoryInstructorRepository = new InMemoryInstructorRepository();
    inMemoryStudentRepository = new InMemoryStudentRepository();

    createScheduleUseCase = new CreateScheduleUseCase(
      inMemoryInstructorRepository,
      inMemoryScheduleRepository,
    );

    registerInstructorUseCase = new RegisterInstructorUseCase(
      inMemoryInstructorRepository,
    );
    registerStudentUseCase = new RegisterStudentUseCase(
      inMemoryStudentRepository,
    );

    sut = new ScheduleClassUseCase(
      inMemoryScheduleRepository,
      inMemoryStudentRepository,
    );
  });

  it('should be able to schedule class', async () => {
    const { student } = await registerStudentUseCase.execute({
      name: 'Studant',
      email: 'studant@example.com',
      password: '123456',
    });

    const { instructor } = await registerInstructorUseCase.execute({
      name: 'Instructor',
      email: 'intructor@example.com',
      password: '123456',
      courseId: new UniqueEntityID(),
    });

    const { schedule } = await createScheduleUseCase.execute({
      courseId: new UniqueEntityID(),
      name: `test 1`,
      description: '12356',
      instructorId: instructor.id,
      scheduledAt: new Date(),
    });

    const result = await sut.execute({
      scheduleId: schedule.id.toString(),
      studentId: student.id.toString(),
    });

    expect(result?.message).toEqual('sucess');
  });
});
