import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../Actions/cartActions";
import MessageBox from "./MessageBox";
import Fade from "react-reveal/Fade";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandeler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandeler = () => {
    if (userInfo) {
      props.history.push(`/Shipping`);
    } else {
      props.history.push(`/SignIn`);
    }
  };
  return (
    <>
    <Fade bottom cascade={true}>
    <div className="artistBigContainer cart-shipping"  >
      
      <div className="form2">
        <div className="subtotal">
          <div>
          <h2>Shopping Cart</h2>
          {cartItems.lenght === 0 ? (
            <MessageBox>
              Cart is empty<Link to="/">Go Shopping!</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
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
                        <h3>{item.name}</h3>
                      </Link>
                    </div>
                    {/* <div className="cartSelect">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div>
                      <h3>{item.price} €</h3>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandeler(item.product)}
                      >
                        <h3>Delete</h3>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal(
                  <span className="inCart">
                    {cartItems.reduce((a, c) => a + c.qty, 0)} in cart)
                  </span>
                  :{cartItems.reduce((a, c) => a + c.price * c.qty, 0)} €
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandeler}
                  className="primary block"
                  disabled={cartItems.lenght === 0}
                >
                  <h3>Proceed to checkout</h3>
                </button>
              </li>
            </ul>
          </div>
          </div>
       
      </div>
    
    </div>
      </Fade>
      </>
  );
}
