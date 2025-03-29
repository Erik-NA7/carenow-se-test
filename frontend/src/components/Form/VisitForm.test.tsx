import { render, screen, fireEvent } from '@testing-library/react'
import { VisitForm } from './VisitForm'
import { Provider } from '../ui/provider'

const TestVisitForm = () => {
  return (
    <Provider>
      <VisitForm />
    </Provider>
  )
}

describe('PatientForm Component', () => {
  test('renders form fields', () => {
    render(
      <TestVisitForm/>
    )
    expect(screen.getByLabelText(/patient name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/patient id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByText(/medications/i)).toBeInTheDocument()
    expect(screen.getByText(/treatments/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cost/i)).toBeInTheDocument()
  })

  test('shows validation errors', async () => {
    render(
      <TestVisitForm/>
    )
    fireEvent.click(screen.getByText('Save'))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
  })
})