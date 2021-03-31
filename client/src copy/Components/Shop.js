import React, { useEffect, /* useState */ } from "react";
/* import Axios from "axios"; */
import Fade from "react-reveal/Fade";
/* import dataShop from "../db/dataShop"; */
import Rating from "./Rating";
import { Link } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useSelector, useDispatch } from "react-redux"
import { listProducts } from "../Actions/productActions";

export default function Shop() {
  //React Hooks
  /* const [products,setProducts]= useState([ ])
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(false) */
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList

  // useEffects accepts two parameters: a function and an array 
  useEffect(()=>{
    /* const fetchData= async()=>{
      try{
        setLoading(true);
        const {data}=await axios.get('/api/Shop')
        setLoading(false);
        setProducts(data);
      }
      catch(err){
        setError(err.message);
        setLoading(false)
      }
    }
    fetchData() */
    dispatch(listProducts())

  },[])//it's gonna run just one time
  return (
    <Fade bottom cascade={true}>
      {loading? <LoadingBox></LoadingBox>
      :
      error?<MessageBox variant="danger">{error}</MessageBox>
    :(
      <div className="cardContainer">
        {/* dataShop. */products.map((product) => {
          return (
            
            <div key={product._id} className="card">
              <Link to={`./Shop/${product._id}` }  >
                {/* image size 680px by 830px */}
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/Shop/${product._id}`}>
                  <h2>{product.name}</h2>
                  </Link>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
                <div className="price"><h3>{product.price} €</h3></div>
                <br></br>
              </div>
            
            </div>
            
          );
        })}
      </div>
      
    )}
    <div className="Footer"></div>
    </Fade>
  );
}
