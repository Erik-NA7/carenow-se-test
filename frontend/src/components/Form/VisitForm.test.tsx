import { render, screen } from "@testing-library/react"
import { VisitForm as Form } from "./VisitForm"
import { Provider } from "../ui/provider"

const VisitForm = () => {
  return (
    <Provider>
      <Form />
    </Provider>
  )
}

describe("VisitForm", () => {
  test('renders form fields', () => {
    render(
      <VisitForm/>
    )
    expect(screen.getByLabelText(/patient name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/patient id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByText(/medications/i)).toBeInTheDocument()
    expect(screen.getByText(/treatments/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cost/i)).toBeInTheDocument()
  })

  // it("renders the form", () => {
  //   render(<VisitForm />)
  //   expect(screen.getByLabelText(/patient name/i)).toBeInTheDocument()
  //   expect(screen.getByText(/patient/i)).toBeInTheDocument()
  // })
})
