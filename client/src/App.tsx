
import './App.css'
import SignUpForm from './components/Signup'
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './components/Home';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
