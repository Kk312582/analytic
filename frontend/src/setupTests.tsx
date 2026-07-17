import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('react-plotly.js', () => ({
  default: () => <div>Mocked Plotly Chart</div>
}))
