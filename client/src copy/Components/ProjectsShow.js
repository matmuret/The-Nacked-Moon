import React, { useEffect, Fragment, useContext,useState } from "react";
import MyContext from "../Context/MyContext";
import { useParams } from "react-router-dom";
import Modal from "react-modal";



export default function ProjectsShow() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null)
  const { getAlbum, setGetAlbum } = useContext(MyContext);
  const {id} = useParams();
  console.log(id);
  useEffect(() => {
    const getResult = async () => {
      try {
        const url = `http://localhost:5000/api/albumup/${id}`;
        const res = await fetch(url);
        console.log({ url });
        const album = await res.json();
        console.log(album);
        setGetAlbum(album);
      } catch (err) {}
    };
    getResult();
  }, []);
  console.log(getAlbum);
  const callBoth = (url) => {
    setIsOpen(true)
    setSelectedImg(url)
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
      <div>
        <h1 className="VisionTitle">{getAlbum && getAlbum.albumName}</h1>
        <br></br>
        <div className="soulsContainer">
        {getAlbum &&
          getAlbum.images.map((item) => {
            return (
              
                <img
                  src={item}
                  key={item}
                  onClick={() => {callBoth(item)}}
                  classname="soulsItems"
                />
              
            );
          })} 
          </div>
      </div>
    </Fragment>
  );
}  