import { useEffect, useState } from "react";
import{ useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterSreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password are not match');
        } else{
            dispatch(register(name, email, password));
        }
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
                    <h1>Create Account</h1>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"  className="form-control" placeholder="Enter name" required 
                    onChange={ e => setName(e.target.value)}></input>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Enter confirm password" required
                    onChange={ e => setConfirmPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-warning my-1">Register</button>
                <div className="my-2">
                    Already have an account?{' '}
                    <Link to = {`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </form>
        </div>
    )
}