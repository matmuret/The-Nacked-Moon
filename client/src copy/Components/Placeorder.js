import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Actions/orderAction";
import { ORDER_CREATE_RESET } from "../Constants/orderConstants";
import CheckoutSteps from "./CheckoutSteps";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";

export default function Placeorder(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/Payment");
  }
  const orderCreate =useSelector(state=>state.orderCreate);
  const {loading, success,error,order}=orderCreate;
 
  const toPrice = (num) => Number(num.toFixed(2)); //5,123 => "5.12"=> 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch()
  const placeOrderHandler = () => {
    
    dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    //I replace cartItems with orderItems

  };
useEffect(()=>{
if(success){
  props.history.push(`/order/${order._id}`)
  dispatch({type:ORDER_CREATE_RESET});
}
},[dispatch, order, props.history, success])
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="artistBigContainer">
        <div className="form2"style={{marginTop:"4%"}} >
          <div>
          <div>
            <h3>Shipping</h3>
            <p>
              <strong>Name: </strong>
              {cart.shippingAddress.fullName}
              <br />
              <strong>Address: </strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city}
              ,{cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </div>

          <div>
            <h3>Payment</h3>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div>
            <h3>Order Items</h3>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div className="smallCart">
                      <img
                        src={item.image}
                        alt={item.name}
                      ></img>
                    </div>
                    <div className="min-30">
                      <Link to={`/Shop/${item.product}`}>
                        <p>{item.name}</p>
                      </Link>
                    </div>

                    <div>
                      <p>{item.price} €</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <h3>Order summary</h3>
              </li>
              <li>
                <div>
                  <p>Items</p>
                </div>

                <div>
                  <p>{cart.itemsPrice.toFixed(2)} €</p>
                </div>
              </li>
              <li>
                <div>
                  <p>Shipping</p>
                </div>
                <div>
                  <p>{cart.shippingPrice.toFixed(2)} €</p>
                </div>
              </li>
              <li>
                <div>
                  <p>Tax</p>
                </div>

                <div>
                  <p>{cart.taxPrice.toFixed(2)} €</p>
                </div>
              </li>
              <li>
                <div>
                  <p>Total</p>
                </div>

                <div>
                  <p>{cart.totalPrice.toFixed(2)} €</p>
                </div>
              </li>
              <li>
                <button
                  type="continue"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  <h2>Place Order</h2>
                </button>
              </li>
              {
                loading&& <LoadingBox></LoadingBox>
              }
              {
                error && <MessageBox variant="danger">{error}</MessageBox>
              }
            </ul>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
