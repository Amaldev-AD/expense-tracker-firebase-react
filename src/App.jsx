

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/index.jsx';
import ExpenseTrack from './pages/expence-tracker/ExpenseTrack.jsx';




function App() {


  return (
    <>

     <Router>
      <Routes>
        <Route path='/' exact element={<Auth />}  />
        <Route path='/expense-track'  element={<ExpenseTrack />}  />
      </Routes>
     </Router>
    </>
  )
}

export default App
