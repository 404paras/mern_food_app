import React,{useState} from 'react'

const Register = () => {

    const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });

    const [registerPage,setRegisterPage] = useState(false)
    
      const createAccHandler = () => {
    
        setRegisterPage(true);
      };
    
      const inputsChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const loginHandler = (e) => {
        console.log(loginInputs);
        setLoginInputs({ email: "", password: "" });
      };
    
      const closeHandler = () => {};


  return (
    <div className='register'>

<div className="closebtn" onClick={closeHandler}>close</div>

<h1>Create an Account</h1>

<form onSubmit={loginHandler}>
  <input type="text" placeholder='Email' name='email' value={loginInputs.email} onChange={inputsChangeHandler}/>
  <input type="password" name="password" placeholder='Enter password' value={loginInputs.password} onChange={inputsChangeHandler}/>
  <button type='submit'>Login</button>
</form>

    </div>
  )
}

export default Register