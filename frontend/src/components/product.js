import { Link } from "react-router-dom";
import Rating from "./rating"

export default function Product(props) {
const {product} = props;
   return(
    <div key={product._id} className="card mt-2 mb-2 mx-2" style={{ width: "18rem" }} >
        <div>
        <img className="card-img-top" src={product.image[0]} alt={product.name} />
        </div>
        <div className="card-body">
            <div className="card-title">
                <Link to={`/product/${product._id}`} className="nav-link">{product.name}</Link>
            </div>
            <Rating rating = {product.rating} numReviews = {product.numReviews}></Rating>
            <div className="mx-1 my-1 price">₹{product.price}</div>
        </div>
    </div>
   ) 
}