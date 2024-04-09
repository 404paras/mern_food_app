import React, { useState } from 'react'
import './app.css';
import {BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar.js'
import Home from './pages/home.js'
import Footer from './components/footer.js'
import Search from './pages/search.js';
import SignIn from './components/SignIn.js'



const App = () => {

  const [signInPage,setSignInPage] = useState(false)
const signInHandler = ()=>{
setSignInPage(true)

}

const closeHandler = ()=>{
  setSignInPage(false)
}

  return (
    <Router >
      <Navbar onSignIn={signInHandler} />
  
<Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='/search' element={<Search/>}/>
  {signInPage && <Route path="*" element={<Navigate to='/'/>}/>}
</Routes>
{
  signInPage && <SignIn onClose={closeHandler}/>
}
<Footer/>
    </Router>
  )
}

export default App