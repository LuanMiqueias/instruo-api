import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Student } from './student';

export interface ScheduleProps {
  name: string;
  description: string;
  instructorId: UniqueEntityID;
  courseId: UniqueEntityID;
  scheduledAt: Date;
  students?: UniqueEntityID[];
}

export class Schedule extends Entity<ScheduleProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get instructorId() {
    return this.props.instructorId;
  }

  get scheduledAt() {
    return this.props.scheduledAt;
  }
  get courseId() {
    return this.props.courseId;
  }

  get students() {
    return this.props.students;
  }

  static create(props: ScheduleProps, id?: UniqueEntityID) {
    const schedule = new Schedule(props, id);

    return schedule;
  }
}
