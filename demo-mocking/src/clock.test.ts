import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clock } from './clock.js'

describe('clock', () => {

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows local system time', () => {
    vi.setSystemTime(new Date(0,0,0, 10, 37, 43))

    expect(clock.showCurrentTime()).toMatchInlineSnapshot(`"10:37:43"`)
  })

  it('provides utc date&time', () => {
    vi.setSystemTime(Date.UTC(2024,6,23, 8, 37, 43))

    expect(clock.utcNow()).toMatchInlineSnapshot(`2024-07-23T08:37:43.000Z`)
  })
})
