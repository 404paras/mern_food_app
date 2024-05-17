import React, { useState, useEffect, Suspense, lazy } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/navbar.js";
import { login } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Shimmer from "./components/Shimmer.js";


const Home = lazy(() => import("./pages/home.js"));
const Search = lazy(() => import("./pages/search.js"));
const SignIn = lazy(() => import("./components/SignIn.js"));
const AddFoodItem = lazy(() => import("./components/AddFoodItem.js"));
const Cart =lazy(()=>import( "./pages/Cart.js"));
const AdminPage = lazy(() => import("./pages/adminPage.js"));
const CategoryRest = lazy(() => import("./pages/CategoryRest.js"));
const CustomerAdmin = lazy(() => import("./pages/CustomerAdmin.js"));
const ManageRestaurant = lazy(() => import('./pages/ManageRestaurant.js'));
const AddRestaurants = lazy(() => import("./components/AddRestaurants.js"));
const RestaurantDishes = lazy(() => import("./pages/RestaurantDishes.js"));
const AdminRoute = lazy(() => import("./components/AdminRoute.js"));

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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

    setIsLoading(false);
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <Shimmer/>
    );
  }

  return (
    <Router>
      <Suspense fallback={<Shimmer/>}>
        <Navbar onSignIn={signInHandler} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/search" element={<Search />} />
          <Route path='category/:name' element={<CategoryRest/>}/>
          <Route path="/restaurant/:categoryName/:id" element={<RestaurantDishes/>}/>
          <Route path='/admin' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AdminPage/>}/>}/>
          <Route path='/admin/addFoodItem' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddFoodItem/>}/>}/>
          <Route path='/admin/manageCustomers' element={<AdminRoute isAuthenticated={isAuthenticated} child={<CustomerAdmin/>}/>}/>
          <Route path='/admin/manageRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<ManageRestaurant/>}/>}/>
          <Route path='/admin/addRestaurant' element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddRestaurants/>}/>}/>
          {signInPage && <Route path="*" element={<Navigate to="/" />} />}
          <Route path="*" element={<Home />} />
        </Routes>
        {signInPage && <SignIn onClose={closeHandler} />}
      </Suspense>
    </Router>
  );
};

export default App;
