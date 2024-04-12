import React, { useState } from "react";
import "../styles/signIn.css";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { server } from '../server.js';
import { useNavigate } from 'react-router-dom';
import {login} from '../store/store.js'

const SignIn = ({ onClose }) => {
  const [registerPage, setRegisterPage] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}api/v1/login`, loginInputs);
      console.log(response);
      setErrorMessage('Login Successful!!')
      sessionStorage.setItem("id",response.data._id)
      console.log(response.data._id)

      navigate('/');

      dispatch(login());
    
     
    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } 
    }
    
    setLoginInputs({ ...loginInputs, email: "", password: "" });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/api/v1/register`, loginInputs);
      alert("Registration Successful");
      console.log(response)
      setRegisterPage(false);
      setLoginInputs({ name: "", email: "", password: "" });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
          <div className="register">
            <h1>Register</h1>
            <span>
              or <span onClick={() => { setRegisterPage(false); setLoginInputs(prevState => ({ ...prevState, name: "" })) }}>login to your account</span>
            </span>
            <form onSubmit={registerHandler}>
              <input
                type="text"
                name="name"
                onChange={inputsChangeHandler}
                placeholder="Name"
                value={loginInputs.name}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={loginInputs.email}
                onChange={inputsChangeHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginInputs.password}
                onChange={inputsChangeHandler}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        ) : (
          <div className="login">
            <h1>Login</h1>
            <span>
              or <span onClick={createAccHandler}>create an account</span>
            </span>
            <form onSubmit={loginHandler}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={loginInputs.email}
                onChange={inputsChangeHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginInputs.password}
                onChange={inputsChangeHandler}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage.toString()}</p>}
      </div>
    </div>
  );
};

export default SignIn;
