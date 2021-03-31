import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { register,  } from "../Actions/signAction";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("?")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const dispatch = useDispatch();
  const submitHandeler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Password and confirm password are not match')
    }else{
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form1">
          <form onSubmit={submitHandeler}>
            <div className="SignIn">
              <h2 className="signin">Create Account</h2>
            </div>
            <div className="email">
              <label htmlFor="email">
                <h3>Name</h3>
              </label>
              <input
                type="text"
                id="name"
                placeholder="enter your name"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
              </div>
              <div className="name">
              <label htmlFor="name">
                <h3>Email address</h3>
              </label>
              <input
                type="email"
                id="email"
                placeholder="enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              </div>
              <div>
                <label htmlFor="password">
                  <h3>Password</h3>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">
                  <h3>Confirm Password</h3>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="enter confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label />

                <button className="signinButton" type="submit">
                  Register
                </button>
              </div>
            
            <div>
              <label />
              <div>
                <h3 className="newCustomer">
                  Already have an account? <Link to={`/SignIn?redirect=${redirect}`} style={{color:'gold'}}>Sign In</Link>
                </h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
