import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../Actions/orderAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => {console.log(state.orderMineList); return state.orderMineList
  });
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
    
  }, [dispatch]);
  
  return (
    <div>
      <h2 style={{ textAlign: "center" ,marginTop:"11%"}}>Orders</h2>
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
                  style={{fontFamily: "Bungee Hairline"}}
                    className="small"
                    type="button"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
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
