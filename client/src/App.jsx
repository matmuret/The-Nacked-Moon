import React, { useState, Fragment, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/Navigation";
import "./App.scss";
import About from "./Components/About";
/* import Collaborations from "./Components/Collaborations"; */
import Contacts from "./Components/Contacts";
import Outdoor from "./Components/Outdoor";
import SignIn from "./Components/SignIn";
import SoulsInABox from "./Components/SoulsInABox";
import Fashion from "./Components/Fashion";
import CategorySearch from "./Components/CategorySearch";
import FashionShow from "./Components/FashionShow";
import OutdoorShow from "./Components/OutdoorShow";
import ProjectsShow from "./Components/ProjectsShow";
import Projects from "./Components/Projects";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Productup from "./Components/Productup";
import Photoup from "./Components/Photoup";
import ProductScreen from "./Components/ProductScreen";
import MyProvider from "./Context/MyProvider";
import AlbumEdit from "./Components/AlbumEdit";
import CreateAlbum from "./Components/CreateAlbum";
import PhotographyCarousel from "./Components/PhotographyCarousel";
import {
  ModalContext,
  ModalProvider,
  handleModal,
} from "./Components/modalContext";
import ScrollToTheTop from "./Components/ScrollToTop";
import { motion } from "framer-motion";
import CartScreen from "./Components/CartScreen";
import ShippingAddressScreen from "./Components/ShippingAddressScreen";
import Register from "./Components/Register";
import Payment from "./Components/Payment";
import Placeorder from "./Components/Placeorder";
import Order from "./Components/Order";
import OrderHistoryScreen from "./Components/OrderHistoryScreen";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import Category from "./Components/Category";
import AlbumDelete from "./Components/AlbumDelete";
import Users from "./Components/users";
import AdminRoute from "./Components/PrivateRoute";
import ProductListScreen from "./Components/ProductListScreen";
import ProductEditScreen from "./Components/ProductEditScreen";
import OrdersListScreen from "./Components/OrdersListScreen"

export default function App() {
  const [show, setShow] = useState(false);
  /* const [showIcon, setShowIcon] = useState(false); */

  const enterVariant = {
    opened: { fontSize: "2vw", y: 100, textAlign: "left", margin: "1%" },
    closed: { fontSize: "0vw", margin: "0%" },
  };
  const logoVariant = {
    opened: { y: 300, opacity: 0.7 },
    closed: { y: -20, opacity: 1 },
  };

  return (
    <MyProvider>
      <ModalProvider>
        <Router>
          <ScrollToTheTop />
          <div className="header">
            {/* <div className="logo"> */}
            <motion.h2
              className="enter"
              initial={{ y: -250 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              variants={enterVariant}
              animate={show ? "closed" : "opened"}
              onClick={() => setShow(!show)}
            >
              Enter
            </motion.h2>
            <motion.h1
              initial={{ y: -250, z: +50 }}
              variants={logoVariant}
              transition={{ duration: 0.3, delay: 0.2 }}
              animate={show ? "closed" : "opened"}
              onClick={() => setShow(!show)}
            >
              The Naked Moon
            </motion.h1>
          </div>

          {show ? (
            <Fragment>
              <Navigation />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/About" component={About} />
                <Route exact path="/fashion" component={Fashion} />
                <Route exact path="/outdoors" component={Outdoor} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/souls" component={SoulsInABox} />
                <Route exact path="/fashion/:id" component={FashionShow} />
                <Route exact path="/outdoors/:id" component={OutdoorShow} />
                <Route exact path="/projects/:id" component={ProjectsShow} />
                {/* <Route
                  exact
                  path="/Collaborations"
                  component={Collaborations}
                /> */}
                <Route exact path="/Shop" component={Shop} />
                <Route exact path="/Shop/:id" component={ProductScreen} />
                <Route exact path="/Cart/:id?" component={CartScreen} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/Register" component={Register} />
                <Route
                  exact
                  path="/Shipping"
                  component={ShippingAddressScreen}
                />
                <Route exact path="/Payment" component={Payment} />
                <Route exact path="/Placeorder" component={Placeorder} />
                <Route exact path="/Order/:id" component={Order} />
                <Route exact path="/Contacts" component={Contacts} />
                <Route exact path="/photoup" component={Photoup} />
                <Route exact path="/productup" component={Productup} />
                <Route exact path="/category" component={Category} />
                <Route exact path="/albumedit/:id" component={AlbumEdit} />
                <Route exact path="/albumdelete/:id" component={AlbumDelete} />
                <Route exact path="/orderslist" component={OrdersListScreen} />
                <Route exact path="/product/:id/edit" component={ProductEditScreen} />
                <Route exact path="/createalbum/category" component={CreateAlbum} />
                <Route
                  exact
                  path="/categorysearch"
                  component={CategorySearch}
                />
                <Route
                  exact
                  path="/orderhistory"
                  component={OrderHistoryScreen}
                />
                <Route exact path="/users" component={Users} />

                <PrivateRoute
                  path="/profile"
                  component={Profile}
                ></PrivateRoute>
                <AdminRoute
                  path="/productlist"
                  component={ProductListScreen}
                ></AdminRoute>
               {/*  <AdminRoute
                  path="/orderslist"
                  component={OrdersListScreen}
                ></AdminRoute> */}
              </Switch>
            </Fragment>
          ) : (
            <div className="presentation"></div>
          )}
          {/* </div> */}
        </Router>
      </ModalProvider>
    </MyProvider>
  );
}
