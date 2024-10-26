import { PaginationParams } from "@/core/repositories/pagination-params";
import { Schedule } from "../../enterprise/entities/schedule";

export abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<void>
  abstract findMany(params:PaginationParams): Promise<Schedule[]>
}
