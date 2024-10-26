import { ScheduleRepository } from '../../repositories/schedule-repository';
import { Schedule } from '@/domain/course/enterprise/entities/schedule';

interface FetchScheduleUseCaseRequest {
  page: number;
  take: number
}

interface FetchScheduleUseCaseResponse {
  schedules: Schedule[]
}

export class FetchScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
  ) {}

  async execute({
    page,
    take
  }: FetchScheduleUseCaseRequest): Promise<FetchScheduleUseCaseResponse> {
    const schedules = await this.scheduleRepository.findMany({
      page, take
    });

    return { schedules };
  }
}
