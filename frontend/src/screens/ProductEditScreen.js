import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../node_modules/axios/index";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props){
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const{ loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
        props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(productId));
        } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

    const uploadFileHandler = async(e) => {
        const files = e.target.files;
        console.log(files);
        const formData = new FormData();
        
        for(let i=0; i<files.length; i++ ){
            const element = files[i];
            console.log(element);
            formData.append('images', element);
        }

        setLoadingUpload(true);

        try{
            const { data } = await Axios.post('/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
              _id: productId,
              name,
              price,
              image,
              category,
              countInStock,
              description,
        })
    );
    };

    return(
        <div>
            <div className="my-4">
            <form className="form" onSubmit={submitHandler}>
                <div>
                <h1>Edit Product {name}</h1>
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
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price"  className="form-control" placeholder="Enter Price" value={price}  onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="text" id="image"  className="form-control" placeholder="Enter Image" value={image}  onChange={(e) => setImage(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageFile">Image File</label>
                            <input type="file" id="imageFile"  className="form-control" placeholder="Choose Images" onChange={uploadFileHandler} multiple></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category"  className="form-control" placeholder="Enter Category" value={category}  onChange={(e) => setCategory(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input type="text" id="countInStock"  className="form-control" placeholder="Enter Count In Stock" value={countInStock}  onChange={(e) => setCountInStock(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea type="text" id="description" row="3" className="form-control" placeholder="Enter Description" value={description}  onChange={(e) => setDescription(e.target.value)}></textarea>
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