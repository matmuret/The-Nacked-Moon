import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../Actions/signAction";
import { USER_UPDATE_PROFILE_RESET } from "../Constants/userConstants";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <div className="authContainer">
      <div className="form1">
        <form onSubmit={submitHandler}>
          <div>
            <h2>Profile</h2>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}

              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <div className="email ">
                <label htmlFor="name">Name</label>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <br></br>
              <div className="email">
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <br></br>
              <div className="email">
                <label htmlFor="password">Password</label>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <br></br>
              <div className="email">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br></br>
                <input
                  style={{ width: "100%" }}
                  id="confirmPassword"
                  type="confirmPassword"
                  placeholder="Enter confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <br></br>
              </div>
              <div>
                <label />
                <br></br>
                <button className="signinButton" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
