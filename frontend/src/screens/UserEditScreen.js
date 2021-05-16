import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props){
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        props.history.push('/userlist');
        }
        if (!user) {
        dispatch(detailsUser(userId));
        } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
      };

    return(
        <div>
            <div className="my-4">
            <form className="form" onSubmit={submitHandler}>
                <div>
                <h1>Edit User {name}</h1>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {
                    loading? <LoadingBox></LoadingBox>
                    :
                    error? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name"  className="form-control" placeholder="Enter name" value={name}
                            onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email"  className="form-control" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label mr-2" htmlFor="isAdmin">Is Admin</label>
                            <input type="checkbox" id="isAdmin"  className="form-check-input" checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}></input>
                        </div>
                        <div>
                            <label />
                            <button type="submit" className="btn btn-lg btn-block btn-primary my-1">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
        </div>

    )
}