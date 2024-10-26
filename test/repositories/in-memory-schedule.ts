import { PaginationParams } from "@/core/repositories/pagination-params";
import { ScheduleRepository } from "@/domain/course/application/repositories/schedule-repository"
import { Schedule } from "@/domain/course/enterprise/entities/schedule"

export class InMemoryScheduleRepository implements ScheduleRepository {
  public items: Schedule[] = []

  async create(schedule: Schedule) {
    this.items.push(schedule)
  }

  async findMany({page, take} : PaginationParams) {
    if(this.items.length){
      return this?.items?.slice((page - 1) * take, take)
    }
    return []
  }
}
