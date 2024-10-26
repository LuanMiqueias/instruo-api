import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Slug } from './value-objects/slug';
import { Instructor } from './instructor';

export interface CourseProps {
  name: string;
  description: string;
  slug: Slug;
  instructors?: Instructor[] | null;
}

export class Course extends Entity<CourseProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get instructors() {
    return this.props.instructors;
  }

  get slug() {
    return this.props.slug;
  }

  static create(props: CourseProps, id?: UniqueEntityID) {
    const course = new Course(props, id);

    return course;
  }
}
