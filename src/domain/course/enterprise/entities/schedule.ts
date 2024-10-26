import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Student } from "./student";


export interface ScheduleProps {
  name: string
  description: string
  instructorId: UniqueEntityID
  courseId: UniqueEntityID
  scheduledAt: Date
  students?: Student[]
}

export class Schedule extends Entity<ScheduleProps>{
  get name(){
    return this.props.name
  }
  
  get description(){
    return this.props.description
  }
  
  get instructorId(){
    return this.props.instructorId
  }
  
  get scheduleAt(){
    return this.props.scheduledAt
  }
  
  get students(){
    return this.props.students
  }

  static create (props: ScheduleProps, id?:UniqueEntityID){
    const schedule = new Schedule(props, id)

    return schedule
  }
}