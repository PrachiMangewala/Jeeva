import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/orderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import React, { useState } from 'react';


function App() {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

const cart = useSelector(state => state.cart);
const { cartItems } = cart;
const userSignin = useSelector(state => state.userSignin);
const { userInfo } = userSignin;
const dispatch = useDispatch();
const signoutHandler = () => {
      dispatch(signout());
}

  return (
    <BrowserRouter>
    <div>
    <nav className='navigation-bar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          JEEVA
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className='nav-item change-display'>
            <Link to="/cart" className="nav-links">
            <i className="fa fa-shopping-cart"/>
              {cartItems.length > 0 && (
                <span className="badge badge-danger ml-two rounded-circle">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown change-display">
                <Link className="nav-links" to="#">
                <i className="fa fa-user mx-1"/><i className="fa fa-caret-down mx-1"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile" className="nav-links">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory" className="nav-links">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" className="nav-links" onClick={signoutHandler}>Sign Out</Link>
                  </li>
                </ul>
                </div>
              ) : (
                <Link className="nav-links" to="/signin">Sign In</Link>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown change-display">
                <Link to="#admin" className="nav-links">
                  Admin<i className="fa fa-caret-down mx-1"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard" className="nav-links">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="nav-links">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist" className="nav-links">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist" className="nav-links">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            {click && (
              <li className='nav-item dropdown-display'>
                <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>Shopping Cart</Link>
              </li>
            )}
          </li>
          <li>
            {click && userInfo ? (
              <div className="dropdown-display">
                <li className='nav-item'>
                  <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>Your Profile</Link>
                </li>
                <li className='nav-item'>
                  <Link to="/orderhistory" className="nav-links" onClick={closeMobileMenu}>Order History</Link>
                </li>
                <li className='nav-item'>
                  <Link to="#signout" className="nav-links" onClick={() => {signoutHandler(); closeMobileMenu();}}>Sign Out</Link>
                </li>
              </div>
          ):(
            <li className='nav-item'>
              <Link className="nav-links" to="/signin" onClick={closeMobileMenu}>Sign In</Link>
            </li>
          )}
          </li>
          <li>
          {click && userInfo && userInfo.isAdmin && (
              <div className="dropdown-display">
                  <li>
                    <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>Admin-Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="nav-links" onClick={closeMobileMenu}>Admin-Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist" className="nav-links" onClick={closeMobileMenu}>Admin-Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist" className="nav-links" onClick={closeMobileMenu}>Admin-Users</Link>
                  </li>
              </div>
            )}
          </li>
        </ul>
      </nav>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact ></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact ></AdminRoute>
          <AdminRoute path="/product/:id/edit" component = {ProductEditScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component = {OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/dashboard" component = {DashboardScreen} exact></AdminRoute>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
