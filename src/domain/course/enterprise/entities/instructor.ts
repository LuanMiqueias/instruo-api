import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";


export interface InstructorProps {
  name: string
  email: string
  password: string
  courseId: UniqueEntityID
}

export class Instructor extends Entity<InstructorProps>{
  get name(){
    return this.props.name
  }
  
  get email(){
    return this.props.email
  }
  
  get password(){
    return this.props.password
  }
  
  get courseId(){
    return this.props.courseId
  }

  static create (props: InstructorProps, id?:UniqueEntityID){
    const instructor = new Instructor(props, id)

    return instructor
  }
}