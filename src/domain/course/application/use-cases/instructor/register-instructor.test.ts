import { InMemoryInstructorRepository } from "test/repositories/in-memory-instructor"
import { RegisterInstructorUseCase } from "./register-instructor"
import { InstructorAlreadyExistsError } from "../errors/instructor-already-exists"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryInstructorRepository: InMemoryInstructorRepository

let sut: RegisterInstructorUseCase

describe('Register Instructor', () => {
  beforeEach(() => {
    inMemoryInstructorRepository = new InMemoryInstructorRepository()

    sut = new RegisterInstructorUseCase(inMemoryInstructorRepository)
  })

  it('should be able to register a new instructor', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      courseId: new UniqueEntityID()
    })

    expect(result).toEqual({
      instructor: inMemoryInstructorRepository.items[0],
    })
  })

  it('it should not be possible to register a new instructor if the email has been registered', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      courseId: new UniqueEntityID()
    })

    expect(sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      courseId: new UniqueEntityID()
    })).rejects.toBeInstanceOf(InstructorAlreadyExistsError)
  })
})
