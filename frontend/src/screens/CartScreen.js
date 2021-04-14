import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col">
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? <MessageBox>
                        Cart is Empty. <Link to="/"> Go Shopping </Link>
                    </MessageBox>
                        :
                        (
                            <ul className="px-0">
                                {
                                    cartItems.map((item) => (
                                        <li key={item.product} className="nav-link">
                                            <div className="row">
                                                <div className="col">
                                                    <img src={item.image[0]} alt={item.name} className="img-small"></img>
                                                </div>
                                                <div className="col">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div className="col">
                                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {[...Array(item.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col">₹{item.price}</div>
                                                <div className="col">
                                                    <button
                                                        type="button" className="btn btn-danger"
                                                        onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            <div className="col-sm-4">
                <div className="card card-body card-header">
                    <ul className="px-0">
                        <li className="nav-link">
                            <h3>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items ) : ₹{cartItems.reduce((a, c) => a + c.price * c.qty, 0)} 
                            </h3>
                        </li>
                        <li className="nav-link">
                            <button 
                                type="button"
                                className="btn btn-warning btn-lg btn-block"
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                            >Proceed to Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}