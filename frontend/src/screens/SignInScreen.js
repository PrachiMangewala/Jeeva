import { useEffect, useState } from "react";
import{ useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

export default function SignInSreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="container" onSubmit={submitHandler}>
            <form className="form">
                <div className="my-5">
                    <h1>Sign In</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email"  className="form-control" placeholder="Enter email" required 
                    onChange={ e => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" required
                    onChange={ e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-warning my-1">Sign In</button>
                <div className="my-2">
                    New Customer? {' '}
                    <Link to = "/register">Create your account</Link>
                </div>
            </form>
        </div>
    )
}