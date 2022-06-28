import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { DefaultViteComponent } from './DefaultViteComponent'
import '@testing-library/jest-dom'

// https://www.youtube.com/watch?v=oWJpxtAl62w

describe('Simple working test', () => {
  it('test library simply works', () => {
    expect(1 + 1).toEqual(2)
  })
  it('element should be visible', async () => {
    render(<DefaultViteComponent />)
    expect(screen.getByText('count is: 0')).toBeInTheDocument()
  })
  it('should increment', async () => {
    render(<DefaultViteComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => expect(button).toHaveTextContent('count is: 1'))
  })
  it('toUpperCase', () => {
    const result = 'lower_case_string'.toUpperCase()
    expect(result).toMatchSnapshot()
  })
  it('toUpperCase', () => {
    const result = 'UPPER_CASE_STRING'.toLowerCase()
    expect(result).toMatchInlineSnapshot('"upper_case_string"')
  })
})
