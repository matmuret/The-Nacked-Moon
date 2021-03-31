import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import Media from "react-media";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Actions/signAction";

export default function Navigation() {
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();
  const signoutHandeler = () => {
    dispatch(signout());
  };
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div>
      <Media query={{ maxWidth: 425 }}>
        {(matches) =>
          matches ? (
            <Fragment>
              <Link to="#" className="menu-bars">
                <div className="NavBarContainer">
                  <div className="NavBar">
                    <FaIcons.FaBars onClick={showSidebar} />
                  </div>
                </div>
              </Link>

              <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <Link to="#" style={{ textDecoration: "none" }}>
                  <div>
                    <div>
                      <AiIcons.AiOutlineClose onClick={showSidebar} />
                    </div>
                  </div>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div>
                    <div onClick={showSidebar}>Home</div>
                  </div>
                </Link>
                <Link to="/About" style={{ textDecoration: "none" }}>
                  <div>
                    <div onClick={showSidebar}>About</div>
                  </div>
                </Link>
                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => setShow(!show)}
                >
                  <div /* className="dropdown" */>
                    <div onClick={() => setShow(!show)}>
                      Photography <i className="fa fa-caret-down"></i>{" "}
                    </div>
                    {show && (
                      <div className="subNav">
                        <Link to="/fashion" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Fashion</div>
                        </Link>
                        <Link to="/outdoors" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Outdoor</div>
                        </Link>
                        <Link to="/projects" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Projects</div>
                        </Link>
                        <Link to="/souls" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Souls in a Box</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </Link>
                <div>
                  <Link to="/Shop" style={{ textDecoration: "none" }}>
                    <div onClick={showSidebar}>On-Line Shop</div>
                  </Link>
                  <Link to="/Cart" style={{ textDecoration: "none" }}>
                    {cartItems.length > 0 && (
                      <div className="badge">
                        <p style={{ color: "red" }}>
                          {cartItems.length} in Cart
                        </p>
                      </div>
                    )}
                  </Link>
                </div>

                <Link to="/Contacts" style={{ textDecoration: "none" }}>
                  <div>
                    <div onClick={showSidebar}>Contacts</div>
                  </div>
                </Link>
                {userInfo ? (
                  <div>
                    <div className="dropdown user">
                      <Link to="#">
                        <div style={{ color: "gold" }}>
                          {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                        </div>
                      </Link>
                      <ul className="dropdown-content">
                        <li onClick={showSidebar}>
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li onClick={showSidebar}>
                          <Link to="/orderhistory">Orders</Link>
                        </li>
                        <li onClick={showSidebar}>
                          <Link to="#signout" onClick={signoutHandeler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to="/SignIn" style={{ textDecoration: "none" }}>
                    <div>
                      <div onClick={showSidebar}>Sign In</div>
                    </div>
                  </Link>
                )}

                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="/">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li onClick={showSidebar}>
                        <Link to="/productup">Products upload</Link>
                      </li>
                      <li onClick={showSidebar}>
                        <Link to="/orderslist">Total Orders</Link>
                      </li>
                      <li onClick={showSidebar}>
                        <Link to="/users">Users</Link>
                      </li>
                      <li onClick={showSidebar}>
                        <Link to="/categorysearch">Photo Upload</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </nav>
            </Fragment>
          ) : (
            <Fragment>
              <nav className="nav-menu">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div>
                    <div /* onClick={showSidebar} */>Home</div>
                  </div>
                </Link>
                <Link to="/About" style={{ textDecoration: "none" }}>
                  <div>
                    <div /* onClick={showSidebar} */>About</div>
                  </div>
                </Link>
                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => setShow(!show)}
                >
                  <div /* className="dropdown" */>
                    <div onClick={() => setShow(!show)}>
                      Photography <i className="fa fa-caret-down"></i>{" "}
                    </div>
                    {show && (
                      <div className="subNav">
                        <Link to="/fashion" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Fashion</div>
                        </Link>
                        <Link to="/outdoors" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Outdoor</div>
                        </Link>
                        <Link to="/projects" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Projects</div>
                        </Link>
                        <Link to="/souls" style={{ textDecoration: "none" }}>
                          <div onClick={showSidebar}>Souls in a Box</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </Link>

                <Link to="/Contacts" style={{ textDecoration: "none" }}>
                  <div>
                    <div /* onClick={showSidebar} */>Contacts</div>
                  </div>
                </Link>
                {userInfo ? (
                  <div>
                    <div className="dropdown user">
                      <Link to="#">
                        <div style={{ color: "gold" }}>
                          {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                        </div>
                      </Link>
                      <ul className="dropdown-content">
                        <li /* onClick={showSidebar} */>
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li /* onClick={showSidebar} */>
                          <Link to="/orderhistory">Orders</Link>
                        </li>
                        <li /*  onClick={showSidebar} */>
                          <Link to="#signout" onClick={signoutHandeler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to="/SignIn" style={{ textDecoration: "none" }}>
                    <div>
                      <div /* onClick={showSidebar} */>Sign In</div>
                    </div>
                  </Link>
                )}

                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="/">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li /* onClick={showSidebar} */>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li /* onClick={showSidebar} */>
                        <Link to="/orderslist">Total Orders</Link>
                      </li>
                      <li /* onClick={showSidebar} */>
                        <Link to="users">Users</Link>
                      </li>
                      <li /* onClick={showSidebar} */>
                        <Link to="/categorysearch">Photo Upload</Link>
                      </li>
                    </ul>
                  </div>
                )}
                <div>
                  <Link to="/Shop" style={{ textDecoration: "none" }}>
                    <div onClick={showSidebar}>On-Line Shop</div>
                  </Link>
                  <Link to="/Cart" style={{ textDecoration: "none" }}>
                    {cartItems.length > 0 && (
                      <div className="badge">
                        <p style={{ color: "red" }}>
                          {cartItems.length} in Cart
                        </p>
                      </div>
                    )}
                  </Link>
                </div>
              </nav>
            </Fragment>
          )
        }
      </Media>
    </div>
  );
}
