import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

test('renders navbar links and mode toggle', () => {
  render(<Navbar mode="light" setMode={() => {}} setView={() => {}} user={null} handleLogout={() => {}} />)
  expect(screen.getByText('Resume Maker & Analyzer')).toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Dashboard')).toBeInTheDocument()
  expect(screen.getByText('Create')).toBeInTheDocument()
})
