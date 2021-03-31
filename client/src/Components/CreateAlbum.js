import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";
import { useLocation } from "../../node_modules/react-use/lib/index";
import MyContext from "../Context/MyContext";

export default function CreateAlbum(props) {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const { newAlbum, setNewAlbum } = useContext(MyContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
console.log(params)

  const onSubmit = async (data) => {
   
  
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    const res = await fetch("http://localhost:5000/api/albumup", {
      method: "POST",
      body: formData,
    });

    const album = await res.json();
    setNewAlbum(album.createdAlbum);
    alert("Album Created! Proceed to Add Photos")
    
    /* ;
    console.log(album); */
  };

  const addPhoto = () => {
   props.history.push(`/albumedit/${newAlbum._id}`); // ?name=${newAlbum.createAlbum.albumName}
  }; 

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h3>Name</h3>
            </label>
            <input
              type="text"
              name="albumName"
              ref={register({ required: true })}
            />
            {errors.name && "Name is required."}
            <label htmlFor="category">
              <h3>Category </h3>
            </label>
  
            <select id="category" name="category" ref={register}>
              <option value={name}>{name}</option>
              {/* <option value="fashion">fashion</option>
              <option value="outdoors">outdoors</option>
              <option value="souls">souls</option>
              <option value="projects">projects</option> */}
            </select>

            <label>
              <h3>Description</h3>
            </label>
            <textarea
              type="text"
              name="description"
              ref={register({ required: false })}
            />
            {errors.description && "Description is required."}

            <br></br>
            <button type="submit" >
              <h3>Submit</h3>
            </button>
            {newAlbum._id? (
              <button onClick={addPhoto}  >
              <h3>Add photos</h3>
            </button>
            ):(
              <button onClick={addPhoto} style={{display:"none"}} >
              <h3>Add photos</h3>
            </button>
            )}
            
          </form>
        </div>
      </div>
    </Fade>
  );
}
