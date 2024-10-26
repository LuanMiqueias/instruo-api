import { PaginationParams } from '@/core/repositories/pagination-params';
import { Schedule } from '../../enterprise/entities/schedule';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<void>;
  abstract findMany(params: PaginationParams): Promise<Schedule[]>;
  abstract findById(scheduleId: UniqueEntityID): Promise<Schedule | null>;
  abstract scheduleClass(
    studentId: UniqueEntityID,
    scheduleId: UniqueEntityID,
  ): Promise<void>;
}
