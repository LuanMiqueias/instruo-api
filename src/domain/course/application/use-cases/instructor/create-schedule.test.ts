import { InMemoryInstructorRepository } from "test/repositories/in-memory-instructor"
import { RegisterInstructorUseCase } from "./register-instructor"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule"
import { CreateScheduleUseCase } from "./create-schedule"

let inMemoryInstructorRepository: InMemoryInstructorRepository
let inMemoryScheduleRepository: InMemoryScheduleRepository

let sut: CreateScheduleUseCase
let registerInstructorUseCase: RegisterInstructorUseCase

describe('Register Instructor', () => {
  beforeEach(() => {
    inMemoryInstructorRepository = new InMemoryInstructorRepository();
    inMemoryScheduleRepository = new InMemoryScheduleRepository()

    sut = new CreateScheduleUseCase(inMemoryInstructorRepository, inMemoryScheduleRepository);
    registerInstructorUseCase = new RegisterInstructorUseCase(inMemoryInstructorRepository)
  })
  
  it('should be able to register a new instructor', async () => {
    const {instructor} = await registerInstructorUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      courseId: new UniqueEntityID()
    })

    const result = await sut.execute({
      courseId: new UniqueEntityID(),
      name:'test',
      description:'123',
      instructorId: instructor.id,
      scheduledAt: new Date(),
    })

    expect(result).toEqual({
      schedule: inMemoryScheduleRepository.items[0],
    })
  })

})
