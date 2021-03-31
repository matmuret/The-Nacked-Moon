import React, { useEffect, Fragment, useContext, useState } from "react";
import MyContext from "../Context/MyContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ModalContext } from "./modalContext";
import styled, { css } from "styled-components";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import moodboard from "../images/Untitled-2.jpg";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  let { handleModal } = React.useContext(ModalContext);
  const { getData, setGetData } = useContext(MyContext);
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/albumup/bycategory?name=${"home"}`
        );
        const albums = await res.json();
        console.log(albums);
        setGetData(albums);
      } catch (err) {}
    };
    getResult();
    console.log(getData);
  }, []);
  const callBoth = (url) => {
    setIsOpen(true);
    setSelectedImg(url);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 0,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 50%;
  height: 20vh;
  margin: auto;
  `;
  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(10, 7, 7, 0.753)",
          },
          content: {
            backgroundColor: "black",
          },
        }}
      >
        <div className='modalDiv'>
        <button onClick={() => setIsOpen(false)}>
          <h3>Close</h3>
        </button>
        <img className='modalImage' src={selectedImg} key={selectedImg}/>
        </div>
      </Modal>
      <Fade bottom cascade={true}>
        <div className="homeBody">
          <div className="CarouselDiv">
            <img className='moodboard'  src=
              {moodboard} alt='moodboard'
            />
            {/* <Carousel
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
              {getData &&
                getData.map((album) => {
                  return album.images.map((url) => {
                    return (
                      <div style={{ width: "60%", textAlign: "center" }}>
                        <img
                          onClick={() => {
                            callBoth(url);
                          }}
                          className="homeItem"
                          src={url}
                          key={url}
                        />
                      </div>
                    );
                  });
                })}
            </Carousel> */}
          </div>
        </div>
        <div className="Footer"></div>
      </Fade>
    </Fragment>
  );
}
