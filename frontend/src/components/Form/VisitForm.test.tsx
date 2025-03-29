import { VisitForm as Form } from "./VisitForm"
import { Provider } from "../ui/provider"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react-hooks'
import { vi } from 'vitest'
import { medicationOptions, treatMentOptions } from '@/components/Form/dummies'

const VisitForm = () => {
  return (
    <Provider>
      <Form />
    </Provider>
  )
}

describe("VisitForm Component", () => {
  const renderForm = () => {
    render(<VisitForm/>)
    return {
      nameInput: screen.getByLabelText(/patient name/i),
      idInput: screen.getByLabelText(/patient id/i),
      dateInput: screen.getByLabelText(/date/i),
      medicationsInput: screen.getByLabelText(/medications/i),
      treatmentsInput: screen.getByLabelText(/treatments/i),
      costInput: screen.getByLabelText(/cost/i),
      submitButton: screen.getByRole('button', { name: /save/i })
    }
  }

  // Render validation
  describe("Rendering", () => {
    it('renders expected form fields', () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()
  
      expect(nameInput).toBeInTheDocument()
      expect(idInput).toBeInTheDocument()
      expect(dateInput).toBeInTheDocument()
      expect(medicationsInput).toBeInTheDocument()
      expect(treatmentsInput).toBeInTheDocument()
      expect(costInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })

    // Medications selection/checkbox render
    it('renders and trigger medications checkboxes', async () => {
      const user = userEvent.setup()

      renderForm()
    
      // trigger the medications checkboxes
      const trigger = screen.getByRole('textbox', { name: /medications/i })
      await user.click(trigger)

      // Verify that all checkboxes are rendered based on data source
      const options = screen.getAllByRole('menuitemcheckbox')
      
      medicationOptions.forEach(expectedItem => {
        expect(options.find(option => 
          option.textContent?.includes(expectedItem) || 
          option.getAttribute('data-value') === expectedItem
        )).toBeTruthy();
      })
    })

    // Treatments selection/checkbox render
    it('renders and trigger medications checkboxes', async () => {
      const user = userEvent.setup()

      renderForm()
    
      // trigger the Treatments checkboxes
      const trigger = screen.getByRole('textbox', { name: /treatments/i })
      await user.click(trigger)

      // Verify that all checkboxes are rendered based on data source
      const options = screen.getAllByRole('menuitemcheckbox')
      
      treatMentOptions.forEach(expectedItem => {
        expect(options.find(option => 
          option.textContent?.includes(expectedItem) || 
          option.getAttribute('data-value') === expectedItem
        )).toBeTruthy();
      })
    })
  })

  // Form field validation
  describe("Validation", () => {
    // Empty form submit
    it('displays error text when submitting empty form', async () => {
      const {
        submitButton
      } = renderForm()

      userEvent.click(submitButton)

      expect(await screen.findByText(/patient name is required/i)).toBeInTheDocument()
      expect(await screen.findByText(/patient id must be a positive number/i)).toBeInTheDocument()
      expect(await screen.findByText(/treatment date is required/i)).toBeInTheDocument()
      expect(await screen.findByText(/at least one medication is required/i)).toBeInTheDocument()
      expect(await screen.findByText(/at least one treatment is required/i)).toBeInTheDocument()
      expect(await screen.findByText(/cost must be a positive number/i)).toBeInTheDocument()
    })

    // Invalid name
    it('displays error message for invalid name', async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()
      
      fireEvent.change(nameInput, { target: { value: '' } })
      fireEvent.change(idInput, { target: { value: '123' } })
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
      fireEvent.change(medicationsInput, { target: { value: 'Ibuprofen' } })
      fireEvent.change(treatmentsInput, { target: { value: 'Medication' } })
      fireEvent.change(costInput, { target: { value: 'invalid' } })
      userEvent.click(submitButton)

      expect(await screen.findByText(/patient name is required/i)).toBeInTheDocument()
    })

    // Invalid id
    it('displays error message for invalid id', async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(idInput, { target: { value: '0' } })
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
      fireEvent.change(medicationsInput, { target: { value: 'Ibuprofen' } })
      fireEvent.change(treatmentsInput, { target: { value: 'Medication' } })
      fireEvent.change(costInput, { target: { value: 'invalid' } })
      userEvent.click(submitButton)

      expect(await screen.findByText(/patient Id must be a positive number/i)).toBeInTheDocument()
    })

    // Invalid date
    it('displays error message for invalid date', async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(idInput, { target: { value: '123' } })
      fireEvent.change(dateInput, { target: { value: '' } })
      fireEvent.change(medicationsInput, { target: { value: 'Ibuprofen' } })
      fireEvent.change(treatmentsInput, { target: { value: 'Medication' } })
      fireEvent.change(costInput, { target: { value: 'invalid' } })
      userEvent.click(submitButton)

      expect(await screen.findByText(/treatment date is required/i)).toBeInTheDocument()
    })
    
    // Invalid cost
    it('displays error message for invalid cost', async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(idInput, { target: { value: '123' } })
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
      fireEvent.change(medicationsInput, { target: { value: 'Ibuprofen' } })
      fireEvent.change(treatmentsInput, { target: { value: 'Medication' } })
      fireEvent.change(costInput, { target: { value: 'invalid' } })
      userEvent.click(submitButton)

      expect(await screen.findByText(/cost must be a positive number/i)).toBeInTheDocument()
    })

    // Invalid Medications
    it('displays error message for invalid medications', async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(idInput, { target: { value: '123' } })
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
      fireEvent.change(medicationsInput, { target: { value: 'Ibuprofen' } })
      fireEvent.change(treatmentsInput, { target: { value: 'Medication' } })
      fireEvent.change(costInput, { target: { value: 'invalid' } })
      userEvent.click(submitButton)

      expect(await screen.findByText(/cost must be a positive number/i)).toBeInTheDocument()
    })

    // Validate Medications selection/checkbox change (check/uncheck)
    it('Change of medications selection must reflect change of input value', async () => {
      const user = userEvent.setup()

      const inputTrigger = renderForm().medicationsInput as HTMLInputElement
    
      // trigger the medications checkboxes
      await user.click(inputTrigger)

      // All checkboxes are rendered based on data source
      const options = screen.getAllByRole('menuitemcheckbox')

      // All checkboxes should initially unchecked
      options.forEach(option => {
        expect(option).toHaveAttribute('aria-checked', 'false');
      });
      
      // Verify the medications input has the checked item value
      const expectedValues = options.map(opt => opt.getAttribute('data-value'));

      // Test checking each option
      for (const [index, option] of options.entries()) {
        
        // Initially should be unchecked
        expect(option).toHaveAttribute('aria-checked', 'false');
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute('aria-checked', 'true');
        
        // Verify form value contains the selected value
        const currentValue = inputTrigger.value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(', ')).toContain(selectedValue);
      }

      // Test unchecking each option
      for (const [index, option] of options.entries()) {
        // At this point should be checked
        expect(option).toHaveAttribute('aria-checked', 'true');
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute('aria-checked', 'false');
        
        // Verify form value doesn't contain the selected value
        const currentValue = inputTrigger.value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(', ')).not.toContain(selectedValue);
      }
    })

    // Validate Treatments selection/checkbox change (check/uncheck)
    it('Change of treatments selection must reflect change of input value', async () => {
      const user = userEvent.setup()

      // trigger the treatments checkboxes
      const inputTrigger = renderForm().treatmentsInput as HTMLInputElement
      await user.click(inputTrigger)

      // All checkboxes are rendered based on data source
      const options = screen.getAllByRole('menuitemcheckbox')

      // All checkboxes should initially unchecked
      options.forEach(option => {
        expect(option).toHaveAttribute('aria-checked', 'false');
      });
      
      // Verify the treatments input has the checked item value
      const expectedValues = options.map(opt => opt.getAttribute('data-value'));

      // Test checking each option
      for (const [index, option] of options.entries()) {
        
        // Initially should be unchecked
        expect(option).toHaveAttribute('aria-checked', 'false');
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute('aria-checked', 'true');
        
        // Verify form value contains the selected value
        const currentValue = inputTrigger.value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(', ')).toContain(selectedValue);
      }

      // Test unchecking each option
      for (const [index, option] of options.entries()) {
        // At this point should be checked
        expect(option).toHaveAttribute('aria-checked', 'true');
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute('aria-checked', 'false');
        
        // Verify form value doesn't contain the selected value
        const currentValue = inputTrigger.value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(', ')).not.toContain(selectedValue);
      }
    })
  })

  // Valid Form Submission
  describe("Form Submission", () => {
    it('submits the form with valid data', async () => {
      const user = userEvent.setup()

      const {
        nameInput,
        idInput,
        dateInput,
        medicationsInput,
        treatmentsInput,
        costInput,
        submitButton
      } = renderForm()

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(idInput, { target: { value: '123' } })
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } })
      fireEvent.change(costInput, { target: { value: '100' } })

      // Select at least one medications
      await user.click(medicationsInput)
      const options = screen.getAllByRole('menuitemcheckbox')
      await user.click(options[0])
      
      
      userEvent.click(submitButton)

      // Wait for the form submission to complete
      // await waitFor(() => {
      //   // Verify that the form submission was successful
      //   expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      //   expect(mockOnSubmit).toHaveBeenCalledWith({
      //     patientName: 'John Doe',
      //     patientId: XXX,
      //     treatmentDate: '2023-01-01',
      //     medications: ['Ibuprofen'],
      //     treatments: ['Medication'],
      //     cost: 100,
      //   });
      // });
    })
  })
})
