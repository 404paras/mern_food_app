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
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [signInPage, setSignInPage] = useState(false);

  const signInHandler = () => {
    setSignInPage(true);
  };

  const closeHandler = () => {
    setSignInPage(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      dispatch(login());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar onSignIn={signInHandler} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        {signInPage && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>

      {signInPage && <SignIn onClose={closeHandler} />}

      <Footer />
    </Router>
  );
};

export default App;
