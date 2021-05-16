import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/orderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen'


function App() {

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
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Jeeva</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbar-nav-scroll" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/">Products</a>
                <a className="nav-link" href="/">About Us</a>
                <a className="nav-link" href="/">Contact Us</a>
              </div>
            </div>
            <Link className="navbar-brand" to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge badge-danger ml-two rounded-circle">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                <Link className="navbar-brand" to="#">
                  {userInfo.name}<i className="fa fa-caret-down mx-1"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile" className="navbar-brand">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory" className="navbar-brand">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" className="navbar-brand" onClick={signoutHandler}>Sign Out</Link>
                  </li>
                </ul>
                </div>
              ) : (
                <Link className="navbar-brand" to="/signin">Sign In</Link>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin" className="navbar-brand">
                  Admin<i className="fa fa-caret-down mx-1"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="navbar-brand">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist" className="navbar-brand">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist" className="navbar-brand">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
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
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
