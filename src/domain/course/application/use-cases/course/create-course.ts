import { CourseRepository } from '../../repositories/course-repository';
import { Course } from '@/domain/course/enterprise/entities/course';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InstructorRepository } from '../../repositories/instructor-repository';
import { Slug } from '@/domain/course/enterprise/entities/value-objects/slug';

interface CreateCourseUseCaseRequest {
  name: string;
  description: string;
  instructorsId?: UniqueEntityID[];
}

interface CreateCourseUseCaseResponse {
  course: Course;
}

export class CreateCourseUseCase {
  constructor(
    private courseRepository: CourseRepository,
    private instructorRepository: InstructorRepository,
  ) {}

  async execute({
    name,
    description,
    instructorsId,
  }: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> {
    const instructors =
      !!instructorsId?.length &&
      (await this.instructorRepository.findManyById(instructorsId));

    if (!instructors && instructorsId) {
      throw new Error('Resource not found');
    }

    const course = Course.create({
      description,
      name,
      instructors: instructors || null,
      slug: Slug.create(name),
    });

    await this.courseRepository.create(course);

    return { course };
  }
}
