import React, { useState, useEffect, Suspense, lazy  } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar.js";
import Shimmer from "./components/Shimmer.js";
import { login } from "./store/authSlice.js";

import Payment from "./pages/Payment/Payment.js";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.js";
import PaymentFailed from "./pages/Payment/PaymentFailed.js";


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
const AdminOrders = lazy(()=>import('./components/AdminOrders.js'))

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
      dispatch(login({
        role: userRole,
        id: userId,
        name: sessionStorage.getItem('name') || '',
        email: sessionStorage.getItem('email') || '',
        phone: sessionStorage.getItem('phone') || '',
        address: sessionStorage.getItem('address') || '',
      }));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) setSignInPage(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <Shimmer />;
  }

  return (
      <Router>
        <AppInner signInPage={signInPage} onSignIn={signInHandler} onClose={closeHandler} />
      </Router>
  );
};

const AppInner = ({ signInPage, onSignIn, onClose }) => {
  const location = useLocation();
  return (
    <Suspense fallback={<Shimmer />}>
      <Navbar onSignIn={onSignIn} />
      <div key={location.pathname} className="page-fade">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User/>}/>
          <Route path="/search" element={<Search />} />
          <Route path="/category/:name" element={<CategoryRest />} />
          <Route path="/restaurant/:categoryName/:id" element={<RestaurantDishes />} />
          <Route path="/offers" element={<UserOffers />} />
          <Route path="/admin" element={<AdminRoute child={<AdminPage />}/>} />
          <Route path="/admin/addFoodItem" element={<AdminRoute child={<AddFoodItem/>}/>} />
          <Route path="/admin/manageCustomers" element={<AdminRoute child={<CustomerAdmin />}/>} />
          <Route path="/admin/manageRestaurant" element={<AdminRoute child={<ManageRestaurant />}/>} />
          <Route path="/admin/addOffers" element={<AdminRoute child={<AdminAddOffers />}/>} />
          <Route path="/admin/addRestaurant" element={<AdminRoute child={<AddRestaurants />}/>} />
          <Route path="/admin/manageOrder" element={<AdminRoute child={<AdminOrders/>}/>}/>
          <Route path="/checkout/:orderId/:price" element={<Payment />} />
          <Route path="/success/:orderId/:paymentId/:amount" element={<PaymentSuccess/>} />
          <Route path="/payment-failed" element={<PaymentFailed/>}/>
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {signInPage && <SignIn onClose={onClose} />}
    </Suspense>
  );
};

export default App;
