import React, { useEffect, Fragment, useContext } from "react";
import MyContext from "../Context/MyContext";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AlbumDelete(props) {
  const { getAlbum, setGetAlbum } = useContext(MyContext);
  const { newAlbum, setNewAlbum } = useContext(MyContext);
  const { register, handleSubmit } = useForm(); // initialize the hook
  const { id } = useParams();
  const history = useHistory();
  console.log(id);
  /* let { handleModal } = React.useContext(ModalContext); */

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
  /* console.log(getAlbum); */

  const onSubmit = async (data) => {
    const formData = new FormData();
    /* console.log({ data }); */
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    /*  formData.append("images", data.images); */
    /*  for (const image of data.image) {
          formData.append('image[]', image)
       } */
    /* const data={ ...images, ...newAlbum} */
    for (let key in getAlbum) {
      //creates a loop iterating over arrays
      formData.append(key, getAlbum[key]);
    }
    /* console.log({data}) */
    const res = await fetch(`http://localhost:5000/api/albumup/${id}`, {
      method: "PUT",
      body: formData,
    });
    const fromApi = await res.json();
    /* console.log(fromApi); */
    formData.delete("images");
    setGetAlbum(fromApi.updatedAlbum);
    /* setNewAlbum({ ...newAlbum, images: fromApi.createdAlbum.images }); */
  };
  const DeletePhoto = async (url) => {
   const name= url.substring(39)
   /* console.log(name) */
    const deleteMethod = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
    };
    try {
      const urlToBeDeleted = `http://localhost:5000/api/albumup/delete/${name}`;
      
      const res = await fetch(urlToBeDeleted, deleteMethod);
      console.log({ urlToBeDeleted });
      const result = await res.json();
      console.log(result);
      /* history.goBack(); */
    } catch (err) {}
  };
  const DeleteAlbum = async (e) => {
    e.preventDefault();
    const deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json", // Indicates the content
      },
      // No need to have body, because we don't send nothing to the server.
    };
    // Make the HTTP Delete call using fetch api
    try {
      const url = `http://localhost:5000/api/albumup/delete/${id}`;
      const res = await fetch(url, deleteMethod);
      console.log({ url });
      const result = await res.json();
      console.log(result);
      history.goBack();
    } catch (err) {}
  };

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h1 className="VisionTitle">
          photos in <span style={{ color: "red" }}>{getAlbum.albumName}</span>{" "}
          <br></br> click on one photo to delete{" "}
        </h1>

        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">
            <h3>Add photo</h3>
          </button>

          <input name="images" ref={register} required type="file" multiple />
        </form>
        <button type="" onClick={(e) => DeleteAlbum(e)}>
          <h3>Delete Album</h3>
        </button>
      </div>
      <div className="soulsContainer">
        {getAlbum.images &&
          getAlbum.images.map((url) => {
            console.log(getAlbum);
            return (
              <div onClick={() => DeletePhoto(url)}>
                {" "}
                <img className="soulsItems" src={url} key={url} />
              </div>
            );
          })}
      </div>
    </Fragment>
  );
}
