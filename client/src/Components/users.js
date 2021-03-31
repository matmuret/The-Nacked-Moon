import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUsers } from "../Actions/signAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function OrderHistoryScreen(props) {
  const usersDetails = useSelector((state) => {console.log(state.usersDetails); return state.usersDetails
  });
  const { loading, error, users } = usersDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUsers());
    console.log(usersDetails)
  }, [dispatch]);
  return (
    <div>
      <h2 style={{ textAlign: "center" ,marginTop:"11%"}}>Users</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="artistBigContainer" /* style={{marginTop:"10%"}} */>
        
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>E-MAIL</th>
            </tr>
          </thead> 
          <tbody>
            {users.map((user => (
              <tr key={user}>
                <td>{user.name}</td>
                <td>{user.email}</td>
               {/*  <td>
                  <button
                  style={{fontFamily: "Bungee Hairline"}}
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td> */}
              </tr>
            )))}
          </tbody>
        </table>
        </div>
      
      )}
    </div>
  );
}
