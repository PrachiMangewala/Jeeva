import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } =cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paytm');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    };
    
    return(
        <div className="container-fluid">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div className="my-3">
                    <h2>Payment Method</h2>
                </div>
                <div className="form-check my-1">
                    <input className="form-check-input" type="radio" name="paymentMethod" id="paytm" value="Paytm" checked required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="paytm">
                        Paytm
                    </label>
                </div>
                <div className="form-check my-1">
                    <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="Cash On Delivery" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="cod">
                        Cash On Delivery
                    </label>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-success my-1">Continue</button>
            </form>
        </div>
    )
}