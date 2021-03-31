import React, { Fragment, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import "react-multi-carousel/lib/styles.css";
import MyContext from "../Context/MyContext.js";
import Carousel from "react-multi-carousel";
import Fade from "react-reveal/Fade";

export default function Outdoor(props) {
  const { getData, setGetData } = useContext(MyContext);
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/albumup/bycategory?name=${"outdoors"}`
        );
        const albums = await res.json();
        console.log(albums);
        setGetData(albums);
      } catch (err) {}
    };
    getResult();
  }, []);
  const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 50%;
    height: 20vh;
    margin: auto;
  `;
  const responsive = {
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Fragment>
    <Fade bottom cascade={true}>
      <div>
        <h1 className="VisionTitle">Outdoors</h1>
      </div>
    </Fade>
    <div className="photography">
        {getData &&
          getData.map((album) => {
            return (
              <div
                onClick={() => {
                  props.history.push(`/fashion/${album._id}`);
                }}
                className="card"
              >
                <div className="card-body"  >
                <h3 className="albumName1" key={album._id} style={{textAlign:'center'}}>{album.albumName} </h3>
                
                
                  {/* {album.images.map((url) => {
                    return */} <img src={album.images[0]} key={album.images[0]} />
                  {/* })} */}
                
                </div>
              </div>
            );
          })}
      </div>
    
      {/* <div className="visionsContainer" >
        <div className="visionsDescriptions">
          {getData &&
            getData.map((album) => {
              return (
                <div onClick={() => {
                  props.history.push(`/outdoors/${album._id}`);
                }}>
                  <h3 className="albumName1" key={album._id}>{album.albumName}</h3>
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={1500}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={2000}
                    containerClass="carousel-container2"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                  >
                    {album.images.map((url) => {
                      return <img src={url} key={url} />;
                    })}
                  </Carousel>
                </div>
              );
            })}
        </div>
      </div> */}
   
    <div className="Footer"></div>
  </Fragment>
);
}
