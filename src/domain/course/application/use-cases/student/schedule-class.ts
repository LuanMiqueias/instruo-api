import { Schedule } from '@/domain/course/enterprise/entities/schedule';
import { ScheduleRepository } from '../../repositories/schedule-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { StudentRepository } from '../../repositories/student-repository';
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found-error';

interface ScheduleClassUseCaseRequest {
  scheduleId: string;
  studentId: string;
}

interface ScheduleClassUseCaseResponse {
  message: string;
}

export class ScheduleClassUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private studentRepository: StudentRepository,
  ) {}

  async execute({
    scheduleId,
    studentId,
  }: ScheduleClassUseCaseRequest): Promise<ScheduleClassUseCaseResponse> {
    const student = await this.studentRepository.findById(
      new UniqueEntityID(studentId),
    );

    const scheduleHasExists = await this.scheduleRepository.findById(
      new UniqueEntityID(scheduleId),
    );

    if (!student) throw new ResourceNotFoundError(`student: ${studentId}`);
    if (!scheduleHasExists)
      throw new ResourceNotFoundError(`schedule: ${scheduleId}`);

    await this.scheduleRepository.scheduleClass(
      new UniqueEntityID(studentId),
      new UniqueEntityID(scheduleId),
    );

    return {
      message: 'sucess',
    };
  }
}
