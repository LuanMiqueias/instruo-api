import { Slug } from "./slug"

test('it shoud be able create a new slug from text', () => {
  const slug = Slug.createFromText('Example course title')

  expect(slug.value).toBe('example-course-title')
})