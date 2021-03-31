import React, { useState, useEffect, Fragment, useContext } from "react";
import MyContext from "../Context/MyContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomeCarousel() {
  const { getPhotos } = useContext(MyContext);
  console.log(getPhotos);

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
      items:2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    
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
      transitionDuration={500}
      containerClass="carousel-container2"
      removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {getPhotos.map((item) => {
        if (item.width_m <= 357) {
          return <img src={item.url_m} key={item.id} />;
        }
      })}
    </Carousel>
  );
}
