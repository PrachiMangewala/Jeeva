import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {

const cart = useSelector(state => state.cart);
const { cartItems } = cart;

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
            <Link className="navbar-brand" to="/signin">Sign In</Link>
          </div>
        </nav>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
