import React, { useEffect, useContext, Fragment,useState } from "react";
import MyContext from "../Context/MyContext";
import Modal from "react-modal";
import Fade from "react-reveal/Fade";

export default function SoulsInABox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const { getData, setGetData } = useContext(MyContext);
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/albumup/bycategory?name=${"souls"}`
        );
        const albums = await res.json();
        console.log(albums);
        setGetData(albums);
      } catch (err) {}
    };
    getResult();
  }, []);
  const callBoth = (url) => {
    setIsOpen(true);
    setSelectedImg(url);
  };
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
        <div className="modalDiv">
          <button onClick={() => setIsOpen(false)}>
            <h3>Close</h3>
          </button>
          <img className="modalImage" src={selectedImg} key={selectedImg} />
        </div>
      </Modal>

      <Fade bottom cascade={true}>
        <div className="soulsBigContainer">
          {getData &&
            getData.map((album) => {
              return (
                <div>
                  <h2 className="soulsTitle">Souls In A Box</h2>
                  <p className="soulsText">{album.description}</p>
                </div>
              );
            })}
          <div className="soulsContainer" >
            {getData &&
              getData.map((album) => {
                return album.images.map((url) => {
                  return (
                    <img
                    
                      onClick={() => {callBoth(url)}}
                      classname="soulsItems"
                      src={url}
                      key={url._id}
                    />
                  );
                });
              })}
          </div>
        </div>
      </Fade>
    </Fragment>
  );
}
