import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DynamicDashboard from './DynamicDashboard'

describe('DynamicDashboard Component', () => {
  it('renders No Data Available initially', () => {
    render(<DynamicDashboard />)
    expect(screen.getByText('No Data Available')).toBeInTheDocument()
  })
})
