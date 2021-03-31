import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { signin } from "../Actions/signAction";

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("?")[1]
    : "/";
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const submitHandeler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {

      props.history.goBack();
    }
  }, [props.history, redirect, userInfo]);
  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form1">
          <form onSubmit={submitHandeler}>
            <div className="SignIn">
              <h2 className="signin">Sign In</h2>
            </div>
            <div className="email">
              <label htmlFor="email">
                <h3>Email address</h3>
              </label>
              <input
                type="email"
                id="email"
                placeholder="enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
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
                <label />

                <button className="signinButton" type="submit">
                  Sign In
                </button>
              </div>
            </div>
            <div>
              <label />
              <div>
                <h3 className="newCustomer">
                  New Customer? <Link to={`/Register?${redirect}`}style={{color:'gold'}} >Create Your Account</Link>
                </h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
