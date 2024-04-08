import React from 'react'
import './app.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar.js'
import Home from './pages/home.js'
import Footer from './components/footer.js'
import Search from './pages/search.js';


const App = () => {
  return (
    <Router>
      <Navbar/>
<Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='search' element={<Search/>}/>
</Routes>
<Footer/>
    </Router>
  )
}

export default App