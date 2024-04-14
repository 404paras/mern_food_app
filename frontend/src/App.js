// App.js
import React, { useState, useEffect } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/home.js";
import Footer from "./components/footer.js";
import { login } from "./store/store.js";
import Search from "./pages/search.js";
import SignIn from "./components/SignIn.js";
import AddProduct from "./components/AddProduct.js";
import AdminRoute from "./components/AdminRoute.js"; // Import the AdminRoute component
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./pages/adminPage.js";
import CustomerAdmin from "./pages/CustomerAdmin.js";
import ManageRestaurant from './pages/ManageRestaurant.js';
import AddRestaurants from "./components/AddRestaurants.js";

const App = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();
  const [signInPage, setSignInPage] = useState(false);

  const signInHandler = () => {
    setSignInPage(true);
  };

  const closeHandler = () => {
    setSignInPage(false);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    const userRole = sessionStorage.getItem('role');

    if (userId && userRole) {
      dispatch(login({ role: userRole }));
    }

    if (isAuthenticated) {
      setSignInPage(false);
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Navbar onSignIn={signInHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/search" element={<Search />} />
        <Route path='/admin' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AdminPage/>}/>}/>
        <Route path='/admin/addProduct' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddProduct/>}/>}/>
       
        <Route path='/admin/manageCustomers' element={<AdminRoute isAuthenticated={isAuthenticated} child={<CustomerAdmin/>}/>}/>
       
        <Route path='/admin/manageRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<ManageRestaurant/>}/>}/>
       
        <Route path='/admin/addRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddRestaurants/>}/>}/>
       
        {/* Use AdminRoute for admin routes */}
        {signInPage && <Route path="*" element={<Navigate to="/" />} />}

        <Route path="*" element={<Home />} />
      </Routes>
      {signInPage && <SignIn onClose={closeHandler} />}
     
      <Footer />
    </Router>
  );
};

export default App;
