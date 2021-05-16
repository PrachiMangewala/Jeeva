import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate; 
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row">
                <div className="col-sm-7">
                    <ul className="list-group">
                        <li>
                            <div className=" card card-header my-2 mx-5">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                    ,{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-header my-2 mx-5">
                                <h2>Payment</h2>
                                <p>
                                <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-header my-2 mx-5">
                                <h2>Ordered Items</h2>
                                <ul className="px-0">
                                {
                                    cart.cartItems.map((item) => (
                                        <li key={item.product} className="nav-link">
                                            <div className="row">
                                                <div className="col">
                                                    <img src={item.image[0]} alt={item.name} className="img-small"></img>
                                                </div>
                                                <div className="col">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>

                                                <div className="col">{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className = "col-sm-4 my-2 mx-2">
                    <div className="card card-header">
                        <ul className="navbar-nav">
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div>Items</div>
                                    <div>₹{cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div>Shipping</div>
                                    <div>₹{cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div>Tax</div>
                                    <div>₹{cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>₹{cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                            <button type="button" onClick={placeOrderHandler} className="btn btn-lg btn-block btn-warning my-1" disabled={cart.cartItems.length === 0}>Place Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}