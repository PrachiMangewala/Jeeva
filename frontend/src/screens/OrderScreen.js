import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    useEffect(() => {
        if(!order || successDeliver || (order && order._id !== orderId)){
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(detailsOrder(orderId));
        }
    }, [dispatch, orderId, successDeliver, order ]);

    // function isDate(val) {
    //     // Cross realm comptatible
    //     return Object.prototype.toString.call(val) === '[object Date]'
    //   }
      
    //   function isObj(val) {
    //     return typeof val === 'object'
    //   }
      
    //    function stringifyValue(val) {
    //     if (isObj(val) && !isDate(val)) {
    //       return JSON.stringify(val)
    //     } else {
    //       return val
    //     }
    //   }
      
    //   function buildForm({ action, params }) {
    //     const form = document.createElement('form')
    //     form.setAttribute('method', 'post')
    //     form.setAttribute('action', action)
      
    //     Object.keys(params).forEach(key => {
    //       const input = document.createElement('input')
    //       input.setAttribute('type', 'hidden')
    //       input.setAttribute('name', key)
    //       input.setAttribute('value', stringifyValue(params[key]))
    //       form.appendChild(input)
    //     })
      
    //     return form
    //   }
      
    //    function post(details) {
    //     const form = buildForm(details)
    //     document.body.appendChild(form)
    //     form.submit()
    //     form.remove()
    //   }

    const getData=(data)=>
    {

        return fetch(`http://localhost:5000/api/config/paytm/payment`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(response=>response.json()).catch(err=>console.log(err))
    }

    const makePayment=()=> {
        getData({totalPrice: order.totalPrice, email: order.user.email, id: order._id}).then(response=>{
        //     var information={
        //         action:"",
        //         params:response
        //     }
        //   post(information)
        // }
        console.log(response);}
        );
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
      };

    return loading ? (<LoadingBox></LoadingBox>):
    error?(<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div className="mx-2 my-3">
            <h2 className="mx-2 my-2">Order {order._id}</h2>
            <div className="row">
                <div className="col-sm-7">
                    <ul className="list-group">
                        <li>
                            <div className=" card card-header my-2 mx-5">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                    ,{order.shippingAddress.country}
                                </p>
                                {order.isDelivered? (
                                <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-header my-2 mx-5">
                                <h2>Payment</h2>
                                <p>
                                <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid? (
                                <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-header my-2 mx-5">
                                <h2>Ordered Items</h2>
                                <ul className="px-0">
                                {
                                    order.orderItems.map((item) => (
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
                                    <div>₹{order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div>Shipping</div>
                                    <div>₹{order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div>Tax</div>
                                    <div>₹{order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>₹{order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                order.isPaid? (
                                    <LoadingBox></LoadingBox>
                                ) : (
                                    <button className="btn btn-lg btn-primary my-2" onClick={makePayment}>Pay Now Using Paytm</button>
                                )
                            }
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && (
                                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                )}
                                <button type="button" className="btn btn-lg btn-primary my-2" onClick={deliverHandler}>
                                    Deliver Order
                                </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}