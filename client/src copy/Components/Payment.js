import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";
import Fade from "react-reveal/Fade";

export default function Payment(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        props.history.push("/Shipping")
    }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/Placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Fade bottom cascade={true}>
        <div className="artistBigContainer">
          <div className="form2" style={{marginTop:"3%"}}>
            <form onSubmit={submitHandler}>
              <div>
                <h2>Payment Method</h2>
              </div>
              <div>
                <input
                  type="radio"
                  id="paypal"
                  value="Paypal"
                  name="paymentMethod"
                  required
                  checkd
                  onChenge={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paypale">
                  <h3>PayPal</h3>
                </label>
              </div>
             {/*  <div>
                <input
                  type="radio"
                  id="stripe"
                  value="Stripe"
                  name="paymentMethod"
                  required
                  onChenge={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="stripe">
                  <h3>Stripe</h3>
                </label>
              </div> */}
              <div>
                <button className="continue" type="submit">
                  <h2>continue</h2>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </>
  );
}
