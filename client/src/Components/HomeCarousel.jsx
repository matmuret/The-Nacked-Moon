import React, { useState, useEffect, Fragment, useContext } from "react";
import MyContext from "../Context/MyContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomeCarousel() {
  const { getPhotosets } = useContext(MyContext);

  
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (

    <Carousel
    arrows={false}
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="all .20"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {getPhotosets.map((item) => { 
        return <img src={item.primary_photo_extras.url_m} key={item.id} />;
      })}
    </Carousel>
  );
}
