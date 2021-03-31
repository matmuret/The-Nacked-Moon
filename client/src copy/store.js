/* import dataShop from "./db/dataShop"; */
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/cartReducer";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer, ordersListReducer } from "./Reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productDeleteReducer
} from "./Reducers/productReducers";
import { userDetailsReducer, userRegisterReducer, userSignInREducer, userUpdateProfileReducer, usersDetailsReducer } from "./Reducers/userReducer";

//You don't want that everything desappears everytime you referesh the page
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: { 
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: 'PayPal'
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate:productUpdateReducer,
  productDelete:productDeleteReducer,
  cart: cartReducer,
  userSignin: userSignInREducer,
  userRegister: userRegisterReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver:orderDeliverReducer,
  orderMineList: orderMineListReducer,
  ordersList: ordersListReducer,
  orderDelete: orderDeleteReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  usersDetails:usersDetailsReducer,


});
/* const reducer = (state,action) =>{
    return {products:dataShop.products}
} */

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
