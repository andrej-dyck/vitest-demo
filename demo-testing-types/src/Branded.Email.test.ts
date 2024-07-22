import { expectTypeOf, test } from 'vitest'
import { Branded } from './Branded.js'

/** branded string */
type Email = Branded<string, 'Email'>

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // a simplified regex

const validEmail = (email: string): Email => {
  if (!emailRegex.test(email))
    throw Error(`not an email: ${email}`)

  return email as Email
}

test('Email is compile-time save', () => {
  const someEmail = validEmail('abc@mail.com')

  expectTypeOf(someEmail).toEqualTypeOf<Email>()
  expectTypeOf(someEmail).not.toEqualTypeOf<string>()
})

const subscribe = (_: Email) => {
  // subscribe logic
}

test('Subscribe with valid Email', () => {
  expectTypeOf(subscribe).parameters.toEqualTypeOf<[Email]>()
})
