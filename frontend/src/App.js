import React, { useState, useEffect } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
<<<<<<< HEAD
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
=======
import Navbar from "./components/navbar.js";
import Home from "./pages/home.js";

>>>>>>> a5bba6d09b0a9aacd1c6e98bf89115065fc68d44
import { login } from "./store/store.js";
import Search from "./pages/search.js";
import SignIn from "./components/SignIn.js";
import AddFoodItem from "./components/AddFoodItem.js";
import AdminRoute from "./components/AdminRoute.js"; // Import the AdminRoute component
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./pages/adminPage.js";
import CategoryRest from "./pages/CategoryRest.js";
import CustomerAdmin from "./pages/CustomerAdmin.js";
import ManageRestaurant from './pages/ManageRestaurant.js';
import AddRestaurants from "./components/AddRestaurants.js";
import RestaurantDishes from "./pages/RestaurantDishes.js";

const App = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();
  const [signInPage, setSignInPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    setIsLoading(false); // Set loading to false once authentication status is determined
  }, [dispatch, isAuthenticated]);

  // If still loading, return null or a loading indicator
  if (isLoading) {
    return null; // Or return a loading spinner
  }

  return (
    <Router>
      <Navbar onSignIn={signInHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/search" element={<Search />} />
        <Route path='category/:name' element={<CategoryRest/>}/>
       <Route path="/restaurant/:categoryName/:id" element={<RestaurantDishes/>}/>
        <Route path='/admin' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AdminPage/>}/>}/>
        <Route path='/admin/addFoodItem' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddFoodItem/>}/>}/>
       
        <Route path='/admin/manageCustomers' element={<AdminRoute isAuthenticated={isAuthenticated} child={<CustomerAdmin/>}/>}/>
       
        <Route path='/admin/manageRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<ManageRestaurant/>}/>}/>
       
        <Route path='/admin/addRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddRestaurants/>}/>}/>
       
        {/* Use AdminRoute for admin routes */}
        {signInPage && <Route path="*" element={<Navigate to="/" />} />}

        <Route path="*" element={<Home />} />
      </Routes>
      {signInPage && <SignIn onClose={closeHandler} />}
     
     
    </Router>
  );
};

export default App;
