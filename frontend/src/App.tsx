import { useState } from 'react'
import { Button, VStack, HStack } from '@chakra-ui/react'
import PatientForm from '@/components/Form/Form'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)
  const [apiResponse, setApiResponse] = useState<string>('')

  const fetchData = async () => {
    console.log('fetching')
    try {
      const response = await fetch('http://localhost:5000/api')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data: { message: string } = await response.json()
      setApiResponse(data.message)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <PatientForm />
    </>
  )
}

export default App
