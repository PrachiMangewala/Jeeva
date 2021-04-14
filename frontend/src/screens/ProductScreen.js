import Rating from '../components/rating'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect, useState } from 'react';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ?
                (<MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <Link to="/">Back to result</Link>
                        <div className="container-fluid my-5">
                            <div className="row">
                                <div className="col-sm-8">
                                    <img className="img-fluid" src={product.image[0]} alt={product.name}></img>
                                </div>
                                <div className="col-sm-4">
                                    <ul className="pl-0">
                                        <li className="nav-link pl-0"><h2>{product.name}</h2></li>
                                        <li className="nav-link pl-0">Price: <span className="price">₹{product.price}</span></li>
                                        <li className="nav-link pl-0">
                                            <Rating
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                            ></Rating>
                                        </li>
                                        <li className="nav-link pl-0">
                                            <div className="row container">
                                                <div className="pr-1">Status:</div>
                                                <div>
                                                    {product.countInStock > 0 ? (
                                                        <span className="success"> In Stock</span>
                                                    ) : (
                                                        <span className="danger"> Unavailable</span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>

                                        {product.countInStock > 0 && (
                                            <>
                                                <li className="nav-link">
                                                    <div className="row">
                                                        <div className="pr-1">Qty</div>
                                                        <div>
                                                            <select
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="nav-link pl-0">
                                                    <button type="button" onClick={addToCartHandler} className="btn btn-success btn-lg btn-block">Add to Cart</button>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )};
        </div>
    )
}