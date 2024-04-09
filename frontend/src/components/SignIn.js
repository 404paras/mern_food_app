import React, { useState } from "react";
import "../styles/signIn.css";
import { IoCloseOutline } from "react-icons/io5";

const SignIn = ({onClose}) => {
  const [registerPage, setRegisterPage] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ name: "", email: "", password: "" });

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(loginInputs);
    setLoginInputs({ ...loginInputs, email: "", password: "" });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    console.log(loginInputs);
    setLoginInputs({ name: "", email: "", password: "" });
  };

  const createAccHandler = () => {
    setRegisterPage(true);
  };

  const closeHandler = () => {
    // Implement close functionality
    onClose();
  };

  return (
    <siv className="signIn">
      <div className="signIn-details">
        <div className="closebtn" onClick={closeHandler}>
          <IoCloseOutline/>
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
      </div>
    </siv>
  );
};

export default SignIn;
