import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('ForecastAI')).toBeInTheDocument()
  })
  
  it('renders the guest mode text', () => {
    render(<App />)
    expect(screen.getByText('Guest Mode')).toBeInTheDocument()
  })
})
