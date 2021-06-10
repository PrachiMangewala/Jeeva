import { useEffect } from 'react';
import Product from '../components/product'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function ProductsDisplayScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ?
                (<MessageBox variant="danger">{error}</MessageBox>
                ) : (
            <div className="container my-3">
                            <div className="my-5 center"><h1>Our Products</h1></div>
                                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                    <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                                        {
                                            products.map((product) => (
                                                <Product key={product._id} product={product}></Product>
                                            ))
                                        }
                                    </div>
                                </div>
        )}
        </div>
    )}