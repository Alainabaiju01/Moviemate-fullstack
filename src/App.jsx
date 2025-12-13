import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header'


// Pages
import Home from './pages/Home'
import Watching from './pages/Watching'
import Watched from './pages/Watched'
import Wish from './pages/Wish'


function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/wish" element={<Wish />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
