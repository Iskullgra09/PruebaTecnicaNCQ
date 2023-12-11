import { useState } from 'react'
import AccordionBoostrap from './components/AccordionBoostrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AccordionBoostrap></AccordionBoostrap>
      </div>
    </>
  )
}

export default App
