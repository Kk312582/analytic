import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the Auth heading initially', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('ForecastAI')).toBeInTheDocument()
    expect(screen.getByText('Create your secure account')).toBeInTheDocument()
  })
})
