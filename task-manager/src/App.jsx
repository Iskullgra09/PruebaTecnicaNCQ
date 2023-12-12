import { useState } from 'react'
import AccordionBoostrap from './components/AccordionBoostrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AccordionBoostrap></AccordionBoostrap>
        </LocalizationProvider>
      </div>
    </>
  )
}

export default App
