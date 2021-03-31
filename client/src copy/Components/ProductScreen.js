import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/* import dataShop from "../db/dataShop"; */
import Rating from './Rating';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { detailsProduct } from '../Actions/productActions';

export default function ProductScreen(props) {
  /* const product = dataShop.products.find(
    (x) => x._id === props.match.params.id //this value is the one the user inserts
  ); */
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandeler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const signout = () => {};

  return (
    <Fragment>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='row top'>
          <div className='col-2'>
            <img className='large' src={product.image} alt={product.name} />
          </div>
          <div className='col-1'>
            <ul>
              <li>
                <h2>{product.name}</h2>
              </li>
              <li>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
              </li>
              <li>
                <h2>{product.price} €</h2>
              </li>
              <li>
                <h2>Description:</h2>
                <p>{product.description}</p>
              </li>
            </ul>
          </div>

          <div className='col-1'>
            <div className='card card-body'>
              <ul>
                <li>
                  <div className='row'>
                    <div>
                      <h3>Price</h3>
                    </div>

                    <div className='price'>
                      <h3>{product.price} €</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    {/* <div><h2>Status: </h2></div>
                <br/> */}
                    <div>
                      {product.countInStock > 0 ? (
                        <span className='success'>
                          <h3>In stock</h3>
                        </span>
                      ) : (
                        <span className='error'>
                          <h3>Unavailable</h3>
                        </span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      {/* <div className="row">
                       <div><p>Quantity</p></div>
                      <div>
                      <select value={qty} onChange={e => setQty(e.target.value)}>
                        {[
                          ...Array(product.countInStock).keys()
                        ].map(x=>(<option key={ x+1 } value={ x+1 }>{x+1}</option>))
                        }
                      </select>
                      </div>
                      </div> */}
                    </li>
                    <li>
                      <button onClick={addToCartHandeler} className='primary block'>
                        <h2>Add to Cart</h2>
                      </button>
                    </li>
                  </>
                )}

                <li>
                  <Link to='/Shop'>
                    <h3 className='BackButton'>Back to the Shop</h3>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
