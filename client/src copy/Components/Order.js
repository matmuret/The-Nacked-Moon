import Axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { deliverOrder, detailsOrder, payOrder } from "../Actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../Constants/orderConstants";

export default function Order(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    console.log(order);
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <div className="artistBigContainer">
        <div className="form3">
          <div>
            <div>
              <h3>
                Order: <br></br>
                {order._id}
              </h3>
              <p>
                <strong>Name: </strong>
                <br></br>
                {order.shippingAddress.fullName}
                <br></br>
                <br></br>
                <strong>Address: </strong>
                <br></br>
                {order.shippingAddress.address},<br></br>
                {order.shippingAddress.postalCode},<br></br>
                {order.shippingAddress.city},<br></br>
                {order.shippingAddress.country}
                <br></br>
              </p>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </div>

            <div>
              <h3>Payment</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid yet</MessageBox>
              )}
            </div>

            <div>
              <h3>Order Items</h3>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div className="smallCart">
                        <img src={item.image} alt={item.name}></img>
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
                    <p>{order.itemPrice.toFixed(2)} €</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>Shipping</p>
                  </div>
                  <div>
                    <p>{order.shippingPrice.toFixed(2)} €</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>Tax</p>
                  </div>

                  <div>
                    <p>{order.taxPrice.toFixed(2)} €</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>Total</p>
                  </div>

                  <div>
                    <p>{order.totalPrice.toFixed(2)} €</p>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <button type="button" onClick={deliverHandler}>
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
