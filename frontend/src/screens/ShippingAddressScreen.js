import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart; 
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
    };

    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName"  className="form-control" placeholder="Enter full name" value={fullName} onChange={ e => setFullName(e.target.value)}  required ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address"  className="form-control" placeholder="Enter address" value={address} onChange={ e => setAddress(e.target.value)}  required ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city"  className="form-control" placeholder="Enter city" value={city} onChange={ e => setCity(e.target.value)}  required ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode"  className="form-control" placeholder="Enter postal code" value={postalCode} onChange={ e => setPostalCode(e.target.value)}  required ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country"  className="form-control" placeholder="Enter country" value={country} onChange={ e => setCountry(e.target.value)}  required ></input>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-success my-1">Continue</button>
            </form>
        </div>
    )
}