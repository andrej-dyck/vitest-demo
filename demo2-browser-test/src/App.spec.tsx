import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@vitest/browser/context'
import { afterEach, expect, test } from 'vitest'

import App from './App.tsx'

afterEach(cleanup)

test('renders App with heading', async () => {
  render(<App />)

  const [h1] = await screen.findAllByRole('heading')

  expect(h1).toHaveTextContent('Vite + React')
})

test('count button', async () => {
  render(<App />)

  const countBtn = await screen.findByRole('button')

  expect(countBtn).toHaveTextContent('count is 0')
  await userEvent.click(countBtn)
  expect(countBtn).toHaveTextContent('count is 1')
  await userEvent.click(countBtn)
  expect(countBtn).toHaveTextContent('count is 2')
})
