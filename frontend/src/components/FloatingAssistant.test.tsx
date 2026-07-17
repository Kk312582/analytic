import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FloatingAssistant from './FloatingAssistant'

describe('FloatingAssistant Component', () => {
  it('renders open button', () => {
    render(<FloatingAssistant />)
    expect(screen.getByRole('button', { name: 'Open AI Assistant' })).toBeInTheDocument()
  })
})
