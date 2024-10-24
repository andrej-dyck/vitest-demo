import { expect, test } from 'vitest'

/**
 * Checks if the given object has the specified field.
 */
export const hasField = <P extends PropertyKey>(obj: unknown, key: P): obj is Record<P, unknown> =>
  obj != null && typeof obj === 'object' && key in obj

// @ts-ignore
if (import.meta.vitest) {

  test('hasField infers that a field exists on an unknown object', () => {
    const obj: unknown = { id: 1 }
    expect(hasField(obj, 'id') ? obj.id : 0).toBe(1)
  })
}
