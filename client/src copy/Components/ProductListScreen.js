import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "./LoadingBox";
import { listProducts, deleteProduct } from "../Actions/productActions";
import MessageBox from "./MessageBox";
import { PRODUCT_DELETE_RESET } from "../Constants/productConstant";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList); //you get "productList" from the store which got it fro Reducers
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete); //you get "productList" from the store which got it fro Reducers
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
   
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts()); //you get "listProduct" from Actions
  }, [dispatch, successDelete]);
  const deleteHandeler = (product) => {
    if(window.confirm('Are you sure my dear you wanna delete this product?')){
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1%",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: "11%" }}>Products</h2>
        <button
          type="button"
          onClick={() => props.history.push(`/productup`)}
          style={{ fontFamily: "Bungee Hairline", marginTop: "11%" }}
          className="small"
        >
          Create product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>};
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="artistBigContainer" /* style={{marginTop:"10%"}} */>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>IN STOCK</th>
                <th>RATING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.rating}</td>
                  <td>
                    <button
                      style={{ fontFamily: "Bungee Hairline" }}
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ fontFamily: "Bungee Hairline" }}
                      className="small"
                      type="button"
                      onClick={() => deleteHandeler(product)}
                    >
                      Delete
                    </button>
                  </td>

                  {/*  <td>
                  <button
                  style={{fontFamily: "Bungee Hairline"}}
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
