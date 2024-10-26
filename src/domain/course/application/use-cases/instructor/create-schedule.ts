import { ScheduleRepository } from '../../repositories/schedule-repository';
import { Schedule } from '@/domain/course/enterprise/entities/schedule';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InstructorRepository } from '../../repositories/instructor-repository';
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found-error';

interface CreateScheduleUseCaseRequest {
  name: string;
  description: string;
  instructorId: UniqueEntityID;
  courseId: UniqueEntityID;
  scheduledAt: Date;
}

interface CreateScheduleUseCaseResponse {
  schedule: Schedule;
}

export class CreateScheduleUseCase {
  constructor(
    private instructorRepository: InstructorRepository,
    private scheduleRepository: ScheduleRepository,
  ) {}

  async execute({
    name,
    description,
    instructorId,
    courseId,
    scheduledAt,
  }: CreateScheduleUseCaseRequest): Promise<CreateScheduleUseCaseResponse> {
    const instructor = await this.instructorRepository.findById(instructorId);

    if (!instructor) {
      throw new ResourceNotFoundError(instructorId.toString());
    }

    const schedule = Schedule.create({
      name,
      description,
      instructorId,
      courseId,
      scheduledAt,
    });

    await this.scheduleRepository.create(schedule);

    return { schedule };
  }
}
