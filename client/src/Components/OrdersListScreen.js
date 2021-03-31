import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "./LoadingBox";

import MessageBox from "./MessageBox";

import { deleteOrder, listOrders } from "../Actions/orderAction";
import { ORDER_DELETE_RESET } from "../Constants/orderConstants";

export default function OrdersListScreen(props ) {
  const ordersList = useSelector((state) => state.ordersList); //you get "ordersList" from the store which got it fro Reducers
  const { loading, error, orders } = ordersList;
  const orderDelete = useSelector((state) => state.orderDelete); //you get "ordersList" from the store which got it fro Reducers
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  console.log(props)
 

  console.log(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure my dear you wanna delete this order?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "11%" }}>Orders</h2>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="artistBigContainer" /* style={{marginTop:"10%"}} */>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>BENEFICIARY</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.shippingAddress.fullName}</td>{" "}
                  {/* populate function from mongoose */}
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)} €</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      style={{ fontFamily: "Bungee Hairline" }}
                      className="small"
                      type="button"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      style={{ fontFamily: "Bungee Hairline" }}
                      className="small"
                      type="button"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
