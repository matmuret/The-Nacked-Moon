import React, { Fragment, useContext, useEffect } from "react";


import Fade from "react-reveal/Fade";
import MyContext from "../Context/MyContext.js";

export default function Fashion(props) {
  const { getData, setGetData } = useContext(MyContext);
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/albumup/bycategory?name=${"fashion"}`
        );
        const albums = await res.json();
        console.log(albums);
        setGetData(albums);
      } catch (err) {}
    };
    getResult();
  }, []);

  return (
    <Fragment>
      <Fade bottom cascade={true}>
        <div>
          <h1 className="VisionTitle">Fashion</h1>
        </div>
      </Fade>

      <div className="photography" /* style={{marginTop:'0%',padding:'0%'}} */>
        {getData &&
          getData.map((album) => {
            return (
              <div
                onClick={() => {
                  props.history.push(`/fashion/${album._id}`);
                }}
                className="card"
              >
                <div className="card-body">
                  <h3
                    className="albumName1"
                    key={album._id}
                    style={{ textAlign: "center" }}
                  >
                    {album.albumName}{" "}
                  </h3>
                </div>
                <div className="imgDiv">
                  <img src={album.images[0]} key={album.images[0]} />
                </div>
              </div>
            );
          })}
      </div>

      <div className="Footer"></div>
    </Fragment>
  );
}
