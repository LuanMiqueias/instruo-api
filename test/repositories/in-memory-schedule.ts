import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { ScheduleRepository } from '@/domain/course/application/repositories/schedule-repository';
import { Schedule } from '@/domain/course/enterprise/entities/schedule';

export class InMemoryScheduleRepository implements ScheduleRepository {
  public items: Schedule[] = [];

  async create(schedule: Schedule) {
    this.items.push(schedule);
  }

  async findMany({ page, take }: PaginationParams) {
    if (this.items.length) {
      return this?.items?.slice((page - 1) * take, take);
    }
    return [];
  }

  async findById(scheduleId: UniqueEntityID) {
    return this.items.find((item) => item.id?.equals(scheduleId)) || null;
  }

  async scheduleClass(studentId: UniqueEntityID, scheduleId: UniqueEntityID) {
    const itemsUpdated: Schedule[] = this.items.map((item) => {
      const studants = item.students;

      if (item.id?.equals(scheduleId)) {
        studants?.push(studentId);
        return Schedule.create({
          courseId: item.courseId,
          description: item.description,
          instructorId: item.instructorId,
          name: item.name,
          scheduledAt: item.scheduledAt,
          students: studants,
        });
      }

      return item;
    });

    this.items = itemsUpdated;
  }
}
