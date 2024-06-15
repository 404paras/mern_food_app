import React, { useState, useEffect, Suspense, lazy  } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar.js";
import Shimmer from "./components/Shimmer.js";
import { login } from "./store/authSlice.js";

import Payment from "./pages/Payment/Payment.js";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.js";

// Lazy-loaded components
const UserOffers = lazy(() => import("./pages/UserOffers.js"));
const Home = lazy(() => import("./pages/home.js"));
const Search = lazy(() => import("./pages/search.js"));
const SignIn = lazy(() => import("./components/SignIn.js"));
const AddFoodItem = lazy(() => import("./components/AddFoodItem.js"));
const Cart = lazy(() => import("./pages/cart.js"));
const AdminPage = lazy(() => import("./pages/adminPage.js"));
const CategoryRest = lazy(() => import("./pages/CategoryRest.js"));
const CustomerAdmin = lazy(() => import("./pages/CustomerAdmin.js"));
const ManageRestaurant = lazy(() => import('./pages/ManageRestaurant.js'));
const AddRestaurants = lazy(() => import("./components/AddRestaurants.js"));
const RestaurantDishes = lazy(() => import("./pages/RestaurantDishes.js"));
const AdminRoute = lazy(() => import("./components/AdminRoute.js"));
const AdminAddOffers = lazy(() => import("./components/AdminAddOffers.js"));
const User = lazy(()=> import("./components/User.js"))

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
    const userName = sessionStorage.getItem('name');
    const email= sessionStorage.getItem('email');
    const phone = sessionStorage.getItem('phone');
    const address = sessionStorage.getItem('address');
    
    if (userId && userRole) {
      dispatch(login({
        role: userRole || "user",
        id: userId || "",
        name: userName || "",
        email: email || "",
        phone: phone || "",
        address: address || "",
      }));
    }
    
    if (isAuthenticated) {
      setSignInPage(false);
    }

    setIsLoading(false);
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <Shimmer />;
  }

  return (
      <Router>
        <Suspense fallback={<Shimmer />}>
          <Navbar onSignIn={signInHandler} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User/>}/>
            <Route path="/search" element={<Search />} />
            <Route path="/category/:name" element={<CategoryRest />} />
            <Route path="/restaurant/:categoryName/:id" element={<RestaurantDishes />} />
            <Route path="/offers" element={<UserOffers />} />
            <Route path="/admin" element={<AdminRoute isAuthenticated={isAuthenticated} child={<AdminPage />}/>} />
            <Route path="/admin/addFoodItem" element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddFoodItem/>}/>} />
            <Route path="/admin/manageCustomers" element={<AdminRoute isAuthenticated={isAuthenticated} child={<CustomerAdmin />}/>} />
            <Route path="/admin/manageRestaurant" element={<AdminRoute isAuthenticated={isAuthenticated} child={<ManageRestaurant />}/>} />
            <Route path="/admin/addOffers" element={<AdminRoute isAuthenticated={isAuthenticated} child={<AdminAddOffers />}/>} />
            <Route path="/admin/addRestaurant" element={<AdminRoute isAuthenticated={isAuthenticated} child={<AddRestaurants />}/>} />
           
            <Route path="/checkout/:orderId/:price" element={<Payment />} />
            <Route path="/success/:orderId/:paymentId/:amount" element={<PaymentSuccess/>} />
            <Route path="*" element={<Home />} />
          </Routes>
          {signInPage && <SignIn onClose={closeHandler} />}
        </Suspense>
      </Router>
  );
};

export default App;
