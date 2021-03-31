import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { detailsProduct, updateProduct } from "../Actions/productActions";
import MessageBox from "./MessageBox";
import LoadingBox from "./LoadingBox";
import { PRODUCT_UPDATE_RESET } from "../Constants/productConstant";

export default function ProductEditScreen(props) {
  console.log(props);
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails; //you get "productDetails" from the store which got it fro Reducers
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate; //you get "productUpdate" from the store which got it fro Reducers
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
  if (!product || product._id !== productId || successUpdate ) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setPrice(product.price);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        rating,
        description,
        countInStock,
        category,
      })
    );
 
  };

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form2">
          <form >
            <h2>Edit Product</h2>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div>
                  <label>
                    <h3>Name</h3>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label>
                    <h3>Category</h3>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label>
                    <h3>Description</h3>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <label>
                    <h3>Price</h3>
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>
                    <h3>In Stock</h3>
                  </label>
                  <input
                    type="text"
                    name="countInStock"
                    placeholder="Enter number"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />

                  <label>
                    <h3>Rating</h3>
                  </label>
                  <input
                    type="text"
                    name="rating"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />

                  <br></br>
                  <button type="submit" onClick={submitHandler}>
                    <h3>Update</h3>
                  </button>
                </div>
                <br></br>
              </>
            )}
          </form>
        </div>
      </div>
    </Fade>
  );
}
