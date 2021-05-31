import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { summaryOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function DashboardScreen() {
    const orderSummary = useSelector((state) => state.orderSummary);
    const { loading, summary, error } = orderSummary;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(summaryOrder());
    }, [dispatch]);

    return (
        <div>
            <div className="row">
                <h1>Dashboard</h1>
            </div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <ul className="row summary">
                        <li>
                        <div className="summary-title color2">
                            <span>
                            <i className="fa fa-shopping-cart" /> Orders
                            </span>
                        </div>
                        <div className="summary-body">
                            {summary.orders[0] ? summary.orders[0].numOrders : 0}
                        </div>
                        </li>
                    </ul>
                </>
            )}
        </div>
    )
}