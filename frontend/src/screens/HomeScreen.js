import { useEffect } from 'react';
import Product from '../components/product'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
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
                    <div>
                        <div className="container-fluid header" style={{
                            backgroundImage: "url(/images/bg-1.jpg)", backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>
                            <div className="content">
                                <img src="/images/jeeva.png" alt="" className="logo" />
                                <p>we thrive to sustain and to provide a way of life</p>
                            </div>
                        </div>

                        {/* <div className="container d-flex flex-row my-5">
                            <div className=" left-container container">
                                <h1>Products We Have</h1>
                                <a className="nav-link" href="/">Toothbrush</a>
                                <a className="nav-link" href="/">Comb</a>
                                <a className="nav-link" href="/">Ear Buds</a>
                            </div>
                            <div className="container">
                                <h1>Why Bamboo</h1>
                                <p>
                                    Bamboo, technically is a type of grass which grows everywhere in the world except for the areas with extremely cold climates.The species of bamboo that we know today evolved from prehistoric grasses between thirty and forty million years ago.
            <br />
            India is the world’s second largest cultivator of bamboo after China. About 50 percent of India’s bamboo resources are in the North Eastern States which has 63 species of bamboo in this region, hence producing the finest bamboo artisans. Despite all this, the country’s share in the global bamboo trade and commerce is only 4%
            <br />
            Through history, wood has become more and more scarce, simply because to produce a full grown tree can take up to sixty years, and another sixty years-time for a replacement, unlike some species of bamboo which equal in height and width to full-matured tree but take as little as sixty days to mature completely.
            <br />
            Bamboo products such as arrows, paper, building materials, and books existed as far back as about seven thousand years. Even in the early years, bamboo had been used in many ways, not to mention the traditional use of bamboo in the daily life of the early people especially in Asia.
          </p>
                            </div>
                        </div> */}

                        <div className="container my-3">
                            <div className="my-5 center"><h1>Featured Products</h1></div>
                                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                    <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                                        {
                                            products.map((product) => (
                                                <Product key={product._id} product={product}></Product>
                                            ))
                                        }
                                    </div>
                                </div>
            </div>
            )}

                    </div>
                )
            }