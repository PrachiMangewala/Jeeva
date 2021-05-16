import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return(
        <div>
            <h1 className="center my-3">ORDER HISTORY</h1>
            {loading ? (<LoadingBox></LoadingBox>):
            error?(<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div className="d-flex flex-md-row flex-column flex-wrap justify-content-around align-items-center mx-3 my-3">
                    {
                        orders.map((order) => (
                            <div key={order._id} className="card bg-light mx-2 my-2 px-2 py-2" style={{ width: "24rem" }}>
                                <ul className="navbar-nav">
                                    <div>
                                    <li>
                                        <div className="d-flex justify-content-between border-bottom pb-1 mb-1">
                                            <div className="text-success"><strong>Order Id:</strong></div>
                                            <div>{order._id}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <div>Date:</div>
                                            <div>{order.createdAt.substring(0, 10)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <div>Total Price: </div>
                                            <div>₹{order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <div>Paid:</div>
                                            <div>{order.isPaid? order.paidAt.substring(0, 10): 'No'}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <div>Delivered:</div>
                                            <div>{order.isDelivered? order.deliveredAt.substring(0, 10): 'No'}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <button 
                                        type="button"
                                        className="btn btn-success my-1"
                                        onClick={() => {props.history.push(`/order/${order._id}`)}}
                                        >Details</button>
                                    </li>
                                    </div>
                                </ul>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )}