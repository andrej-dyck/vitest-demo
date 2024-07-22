import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import '@testing-library/jest-dom/vitest'

import App from './App.tsx'

afterEach(cleanup)

test('renders App with heading', async () => {
  render(<App />)

  const [h1] = await screen.findAllByRole('heading')

  expect(h1).toHaveTextContent('Vite + React')
})
