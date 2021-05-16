export default function CheckoutSteps(props) {
    return(
        <div className="container-fluid">
            <div className="my-2 mx-2">
                <div className="row checkout-steps">
                    <div className={props.step1 ? 'active': ' '}>Sign-In</div>
                    <div className={props.step2 ? 'active': ' '}>Shipping</div>
                    <div className={props.step3 ? 'active': ' '}>Payment</div>
                    <div className={props.step4 ? 'active': ' '}>Place Order</div>
                </div>
            </div>
        </div>
    )
}