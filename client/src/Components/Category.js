import React, { Fragment, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import MyContext from '../Context/MyContext.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled, { css } from 'styled-components';

export default function Category(props) {
  const { getData, setGetData } = useContext(MyContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/albumup/bycategory?name=${name}`
        );
        const albums = await res.json();
        console.log(albums);
        setGetData(albums);
      } catch (err) {}
    };
    getResult();
  }, []);

  const goToAlbum = () => {
    props.history.push(`/albumedit`);
  };
  const goToCreateAlbum = () => {
    props.history.push(`/category/createalbum`);
  };
  const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 50%;
    height: 20vh;
    margin: auto;
  `;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
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
        <div onClick={goToAlbum}>
          <h1 className='VisionTitle'>
            Albums in <span style={{ color: 'red' }}>{name}</span> category:
            <br></br> click on the album to edit{' '}
          </h1>
        </div>
        <div
          style={{
            width: '100vw',
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center',
          }}
        >
          <button onClick={()=>props.history.push(`/createalbum/category?name=${name}`)} style={{ width: '30%' }}>
            <h3>Add a new Album</h3>
          </button>
        </div>

        <div className='visionsContainer'>
          <div className='visionsDescriptions'>
            {getData &&
              getData.map((album) => {
                return (
                  <div
                    onClick={() => {
                      props.history.push(`/albumdelete/${album._id}`);
                    }}
                  >
                    <h3 key={album._id}>{album.albumName}</h3>
                    <Carousel
                      swipeable={true}
                      draggable={true}
                      showDots={false}
                      responsive={responsive}
                      infinite={true}
                      autoPlay={true}
                      autoPlaySpeed={1500}
                      keyBoardControl={true}
                      customTransition='all .5'
                      transitionDuration={500}
                      containerClass='carousel-container2'
                      removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
                      dotListClass='custom-dot-list-style'
                      itemClass='carousel-item-padding-40-px'
                    >
                      {album.images.map((url) => {
                        return <img src={url} key={url} />;
                      })}
                    </Carousel>
                  </div>
                );
              })}
          </div>
        </div>
      </Fade>
    </Fragment>
  );
}
