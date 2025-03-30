import { VisitForm as Form } from "./VisitForm"
import { Provider } from "../ui/provider"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { medicationOptions, treatMentOptions } from "@/components/Form/dummies"
import { createVisit } from "@/services/visit"
import { toaster, Toaster } from '@/components/ui/toaster';


vi.mock("../../services/visit", () => ({
  createVisit: vi.fn(),
}));

const mockCreateVisit = vi.mocked(createVisit);

vi.mock('../ui/toaster', () => ({
  toaster: {
    create: vi.fn(),
  },
  Toaster: function MockToaster() {
    return <div data-testid="mock-toaster" />
  } // Mock the component export
}));

const mockedToaster = vi.mocked(toaster);

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
      medicationsTrigger: screen.getByTitle("medications-trigger"),
      treatmentsInput: screen.getByLabelText(/treatments/i),
      treatmentsTrigger: screen.getByTitle("treatments-trigger"),
      costInput: screen.getByLabelText(/cost/i),
      submitButton: screen.getByRole("button", { name: /save/i })
    }
  }

  // Render validation
  describe("Rendering", () => {
    it("renders expected form fields", () => {
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
    it("renders and trigger medications checkboxes", async () => {
      const user = userEvent.setup()

      renderForm()
    
      // trigger the medications checkboxes
      const trigger = screen.getByTitle("medications-trigger")
      await user.click(trigger)

      // Verify that all checkboxes are rendered based on data source
      const options = screen.getAllByRole("menuitemcheckbox")
      
      medicationOptions.forEach(expectedItem => {
        expect(options.find(option => 
          option.textContent?.includes(expectedItem) || 
          option.getAttribute("data-value") === expectedItem
        )).toBeTruthy();
      })
    })

    // Treatments selection/checkbox render
    it("renders and trigger medications checkboxes", async () => {
      const user = userEvent.setup()

      renderForm()
    
      // trigger the Treatments checkboxes
      const trigger = screen.getByTitle("treatments-trigger")
      await user.click(trigger)

      // Verify that all checkboxes are rendered based on data source
      const options = screen.getAllByRole("menuitemcheckbox")
      
      treatMentOptions.forEach(expectedItem => {
        expect(options.find(option => 
          option.textContent?.includes(expectedItem) || 
          option.getAttribute("data-value") === expectedItem
        )).toBeTruthy();
      })
    })
  })

  // // Form field validation
  describe("Validation", () => {
    // Empty form submit
    it("displays error text when submitting empty form", async () => {
      const {
        submitButton
      } = renderForm()

      const user = userEvent.setup()
      await user.click(submitButton)

      expect(screen.queryByText(/patient name is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/patient id must be a positive number/i)).toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).toBeInTheDocument()
    })

    // Invalid name
    it("displays error message for invalid name", async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsTrigger,
        treatmentsTrigger,
        costInput,
        submitButton
      } = renderForm()
      
      const user = userEvent.setup()

      fireEvent.change(nameInput, { target: { value: "" } })
      fireEvent.change(idInput, { target: { value: "123" } })
      fireEvent.change(dateInput, { target: { value: "2025-03-30" } })
      fireEvent.change(costInput, { target: { value: "1000" } })
      await user.click(medicationsTrigger)
      // Select Ibuprofen
      const ibuprofen = screen.getByRole("menuitemcheckbox", { name: /ibuprofen/i})
      await user.click(ibuprofen)
      // close Medications checkboxes
      await user.click(medicationsTrigger)

      await user.click(treatmentsTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentsTrigger)  
      
      await user.click(submitButton)

      expect(screen.queryByText(/patient name is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/patient id must be a positive number/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).not.toBeInTheDocument()
    })

    // Invalid id
    it("displays error message for invalid id", async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsTrigger,
        treatmentsTrigger,
        costInput,
        submitButton
      } = renderForm()

      const user = userEvent.setup()

      fireEvent.change(nameInput, { target: { value: "John Doe" } })
      fireEvent.change(idInput, { target: { value: "0" } })
      fireEvent.change(dateInput, { target: { value: "2025-03-30" } })
      fireEvent.change(costInput, { target: { value: "1000" } })

      await user.click(medicationsTrigger)
      // Select Ibuprofen
      const ibuprofen = screen.getByRole("menuitemcheckbox", { name: /ibuprofen/i})
      await user.click(ibuprofen)
      // close Medications checkboxes
      await user.click(medicationsTrigger)

      await user.click(treatmentsTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentsTrigger)  
      
      await user.click(submitButton)

      expect(screen.queryByText(/patient name is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/patient Id must be a positive number/i)).toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).not.toBeInTheDocument()})
    
      // Invalid date
    it("displays error message for invalid date", async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsTrigger,
        treatmentsTrigger,
        costInput,
        submitButton
      } = renderForm()

      const user = userEvent.setup()
      
      fireEvent.change(nameInput, { target: { value: "John Doe" } })
      fireEvent.change(idInput, { target: { value: "123" } })
      fireEvent.change(dateInput, { target: { value: "" } })
      fireEvent.change(costInput, { target: { value: "1000" } })
      await user.click(medicationsTrigger)
      // Select Ibuprofen
      const ibuprofen = screen.getByRole("menuitemcheckbox", { name: /ibuprofen/i})
      await user.click(ibuprofen)
      // close Medications checkboxes
      await user.click(medicationsTrigger)

      await user.click(treatmentsTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentsTrigger)  
      
      await user.click(submitButton)
      expect(screen.queryByText(/patient name is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/patient id must be a positive number/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).not.toBeInTheDocument()
    })
    
    // Invalid cost
    it("displays error message for invalid cost", async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        medicationsTrigger,
        treatmentsTrigger,
        costInput,
        submitButton
      } = renderForm()

      const user = userEvent.setup()

      fireEvent.change(nameInput, { target: { value: "John Doe" } })
      fireEvent.change(idInput, { target: { value: "123" } })
      fireEvent.change(dateInput, { target: { value: "2025-03-30" } })
      fireEvent.change(costInput, { target: { value: "invalid" } })
      await user.click(medicationsTrigger)
      // Select Ibuprofen
      const ibuprofen = screen.getByRole("menuitemcheckbox", { name: /ibuprofen/i})
      await user.click(ibuprofen)
      // close Medications checkboxes
      await user.click(medicationsTrigger)

      await user.click(treatmentsTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentsTrigger)  
      
      await user.click(submitButton)

      expect(screen.queryByText(/patient name is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/patient id must be a positive number/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).toBeInTheDocument()
    })

    // Invalid Medications
    it("displays error message for invalid medications", async () => {
      const {
        nameInput,
        idInput,
        dateInput,
        treatmentsTrigger,
        costInput,
        submitButton
      } = renderForm()

      const user = userEvent.setup()
      
      fireEvent.change(nameInput, { target: { value: "John Doe" } })
      fireEvent.change(idInput, { target: { value: "123" } })
      fireEvent.change(dateInput, { target: { value: "2025-03-30" } })
      fireEvent.change(costInput, { target: { value: "1000000" } })
      await user.click(treatmentsTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentsTrigger)  
      await user.click(submitButton)
      
      expect(screen.queryByText(/patient name is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/patient id must be a positive number/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/treatment date is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/medication is required/i)).toBeInTheDocument()
      expect(screen.queryByText(/treatment is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/cost must be a positive number/i)).not.toBeInTheDocument()
    })

    // Validate Medications selection/checkbox change (check/uncheck)
    it("Change of medications selection must reflect change of input value", async () => {
      const user = userEvent.setup()

      const { medicationsInput }= renderForm()

      const trigger = screen.getByTitle("medications-trigger")
    
      // trigger the medications checkboxes
      await user.click(trigger)

      // All checkboxes are rendered based on data source
      const options = screen.getAllByRole("menuitemcheckbox")

      // All checkboxes should initially unchecked
      options.forEach(option => {
        expect(option).toHaveAttribute("aria-checked", "false");
      });
      
      // Verify the medications input has the checked item value
      const expectedValues = options.map(opt => opt.getAttribute("data-value"));

      // Test checking each option
      for (const [index, option] of options.entries()) {
        
        // Initially should be unchecked
        expect(option).toHaveAttribute("aria-checked", "false");
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute("aria-checked", "true");
        
        // Verify form value contains the selected value
        const currentValue = (medicationsInput as HTMLInputElement).value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(",")).toContain(selectedValue);
      }

      // Test unchecking each option
      for (const [index, option] of options.entries()) {
        // At this point should be checked
        expect(option).toHaveAttribute("aria-checked", "true");
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute("aria-checked", "false");
        
        // Verify form value doesn"t contain the selected value
        const currentValue = (medicationsInput as HTMLInputElement).value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(",")).not.toContain(selectedValue);
      }
    })

    // Validate Treatments selection/checkbox change (check/uncheck)
    it("Change of treatments selection must reflect change of input value", async () => {
      const user = userEvent.setup()
      const { treatmentsInput } = renderForm()
      // trigger the treatments checkboxes
      const trigger = screen.getByTitle("treatments-trigger")
      await user.click(trigger)

      // All checkboxes are rendered based on data source
      const options = screen.getAllByRole("menuitemcheckbox")

      // All checkboxes should initially unchecked
      options.forEach(option => {
        expect(option).toHaveAttribute("aria-checked", "false");
      });
      
      // Verify the treatments input has the checked item value
      const expectedValues = options.map(opt => opt.getAttribute("data-value"));

      // Test checking each option
      for (const [index, option] of options.entries()) {
        
        // Initially should be unchecked
        expect(option).toHaveAttribute("aria-checked", "false");
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute("aria-checked", "true");
        
        // Verify form value contains the selected value
        const currentValue = (treatmentsInput as HTMLInputElement).value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(",")).toContain(selectedValue);
      }

      // Test unchecking each option
      for (const [index, option] of options.entries()) {
        // At this point should be checked
        expect(option).toHaveAttribute("aria-checked", "true");
        
        // Click the option
        await user.click(option);
        
        // Verify UI state
        expect(option).toHaveAttribute("aria-checked", "false");
        
        // Verify form value doesn"t contain the selected value
        const currentValue = (treatmentsInput as HTMLInputElement).value;        
        
        const selectedValue = expectedValues[index];
        
        expect(currentValue.split(", ")).not.toContain(selectedValue);
      }
    })
  })

  // Valid Form Submission
  describe("Form Submission", () => {
    it("submits the form with valid data", async () => {
      mockCreateVisit.mockResolvedValue({ success: true, message: "Visit data saved" });
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

      await user.type(nameInput, "John Doe");
      await user.type(idInput, "123")
      await user.type(dateInput, "2025-03-30");
      // fireEvent.change(dateInput, { target: { value: "2025-03-30" } })
      await user.type(costInput, "1000000")

      // Medications checkboxes
      const medicationsTrigger = screen.getByTitle("medications-trigger")
      // Open Medications checkboxes
      await user.click(medicationsTrigger)
      // Select Ibuprofen
      const ibuprofen = screen.getByRole("menuitemcheckbox", { name: /ibuprofen/i})
      await user.click(ibuprofen)
      // close Medications checkboxes
      await user.click(medicationsTrigger)

      // Treatments checkboxes
      const treatmentTrigger = screen.getByTitle("treatments-trigger")
      // Open Treatments checkboxes
      await user.click(treatmentTrigger)
      // Select Physiotherapy
      const physiotherapy = screen.getByRole("menuitemcheckbox", { name: /physiotherapy/i})
      await user.click(physiotherapy)
      // close Treatments checkboxes
      await user.click(treatmentTrigger)     

      // Wait for the form submission to complete
      await waitFor(() => {
        // Verify that the form field value as expected
        expect((nameInput as HTMLInputElement).value).toBe("John Doe")
        expect((idInput as HTMLInputElement).value).toBe("123")
        expect((dateInput as HTMLInputElement).value).toBe("2025-03-30")
        expect((costInput as HTMLInputElement).value).toBe("1000000")
        expect((medicationsInput as HTMLInputElement).value).toContain("Ibuprofen")
        expect((treatmentsInput as HTMLInputElement).value).toContain("Physiotherapy")
      });

      // Submit
      await user.click(submitButton);
      
      await waitFor(() => {
        // Verify that the form field value as expected
        expect(mockCreateVisit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "John Doe",
            patient_id: 123,
            date: "2025-03-30",
            medications: ["Ibuprofen"],
            treatments: ["Physiotherapy"],
            cost: 1000000
          })
          
        )
      });

      await waitFor(() => {
        expect(mockedToaster.create).toHaveBeenCalledWith({
          title: "Visit data saved",
          type: "success"
        })
      })
    })
  })
})
