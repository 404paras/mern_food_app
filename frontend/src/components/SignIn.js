import React, { useState, useEffect } from "react";
import "../styles/signIn.css";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../server.js";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";

const SignIn = ({ onClose }) => {
  const [registerPage, setRegisterPage] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${server}api/v1/login`, loginInputs);
      setErrorMessage("Login Successful!!");
      const role = response?.data?.role;
      sessionStorage.setItem("id", response.data._id);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("name", response.data?.name);
      sessionStorage.setItem("email", response.data?.email);
      sessionStorage.setItem("phone", response.data?.mobile);
      sessionStorage.setItem("address", response.data?.address);
      navigate("/");
      dispatch(login({
        role: role || "user",
        id: response.data._id || "",
        name: response?.data?.name || "",
        email: response?.data?.email || "",
        phone: response?.data?.mobile || "",
        address: response?.data?.address || "",
      }));
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      setLoginInputs({ ...loginInputs, email: "", password: "", mobile: "" });
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${server}api/v1/register`, loginInputs);
      setErrorMessage("Registration Successful!!");
      setRegisterPage(false);
      setLoginInputs({ name: "", email: "", password: "", mobile: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createAccHandler = () => {
    setRegisterPage(true);
  };

  const closeHandler = () => {
    onClose();
  };

  return (
    <div className="signIn">
      <div className="signIn-details">
        <div className="closebtn" onClick={closeHandler}>
          <IoCloseOutline />
        </div>
        {registerPage ? (
          <RegisterForm
            inputs={loginInputs}
            onInputChange={inputsChangeHandler}
            onSubmit={registerHandler}
            isLoading={isLoading}
            setRegisterPage={setRegisterPage}
          />
        ) : (
          <LoginForm
            inputs={loginInputs}
            onInputChange={inputsChangeHandler}
            onSubmit={loginHandler}
            onCreateAccount={createAccHandler}
            isLoading={isLoading}
          />
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

const RegisterForm = ({ inputs, onInputChange, onSubmit, isLoading, setRegisterPage }) => (
  <div className="register">
    <h1>Register</h1>
    <span>
      or{" "}
      <span onClick={() => setRegisterPage(false)}>
        login to your account
      </span>
    </span>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        onChange={onInputChange}
        placeholder="Name"
        value={inputs.name}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={onInputChange}
        required
      />
      <input
        type="text"
        name="mobile"
        onChange={onInputChange}
        placeholder="Mobile Number"
        value={inputs.mobile}
        minLength={10}
        maxLength={10}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={inputs.password}
        onChange={onInputChange}
        required
        minLength={6}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
);

const LoginForm = ({ inputs, onInputChange, onSubmit, onCreateAccount, isLoading }) => (
  <div className="login">
    <h1>Login</h1>
    <span>
      or <span onClick={onCreateAccount}>create an account</span>
    </span>
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={onInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={inputs.password}
        onChange={onInputChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);

export default SignIn;
