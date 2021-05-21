import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {
    const { pageNumber = 1 } = useParams();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    // const userSignin = useSelector((state) => state.userSignin);
    // const { userInfo } = userSignin;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({pageNumber}))
    }, [createdProduct, dispatch, pageNumber, props.history, successCreate, successDelete]);

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        dispatch(createProduct());
      };

    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="my-3">Products</h1>
                <button type="button" className="btn btn-dark rounded-0 my-3" onClick
                    ={createHandler}><i className="fas fa-plus mr-2"></i>Create Product</button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-dark mx-1"
                                            onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                        >
                                            Edit
                                    </button>
                                        <button
                                            type="button"
                                            className="btn btn-dark mx-1"
                                            onClick={() => deleteHandler(product)}
                                        >
                                            Delete
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="center">
                    {[...Array(pages).keys()].map((x) => (
                    <Link
                        className={x + 1 === page ? 'active' : ''}
                        key={x + 1}
                        to={`/productlist/pageNumber/${x + 1}`}
                    >
                        {x + 1}
                    </Link>
                    ))}
                </div>

                    </>
                )}
        </div>
    )
}