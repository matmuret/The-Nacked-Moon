import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/cartActions";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector(state=>state.userSignin)
  const { userInfo } = userSignin;
  const cart =useSelector(state=>state.cart)
  const { shippingAddress } = cart;
  if(!userInfo){
      props.history.push('/SignIn')
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({fullName, address, city, postalCode,country}));
    props.history.push('/Payment');
    //dispatch save shipping address action
  };
  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Fade bottom cascade={true}>
        <div className="artistBigContainer">
          <div className="form2" style={{marginTop:"4%"}}>
            <form onSubmit={submitHandler}>
              <div>
                <h2>Shipping Address</h2>
              </div>
              <div>
                <label htmlFor="fullName">
                  <h3>Full Name</h3>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeHolder="Enter full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="address">
                  <h3>Address</h3>
                </label>
                <input
                  type="text"
                  id="address"
                  placeHolder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="city">
                  <h3>City</h3>
                </label>
                <input
                  type="text"
                  id="city"
                  placeHolder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="postalCode">
                  <h3>Postal code</h3>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  placeHolder="Enter postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="country">
                  <h3>Country</h3>
                </label>
                <input
                  type="text"
                  id="country"
                  placeHolder="Enter coutry"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label />
                <button className="continue" type="submit">
                  <h2>Continue</h2>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="Footer"></div>
      </Fade>
    </>
  );
}
