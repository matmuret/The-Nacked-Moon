import React from "react";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";

export default function Phototup() {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  const onSubmit = async (data) => {
    if (data.albumName && data.albumName.length > 0) {
        data.albumName = data.albumName[0];
      }
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
  
      const res = await fetch("http://localhost:5000/api/photoup", {
        method: "POST",
        body: formData,
      });
      const fromApi = await res.json();
      alert(JSON.stringify(res));
      console.log(fromApi);
    };

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form2">

          
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h3> Album Name</h3>
            </label>
            <input type="text" name="albumName" ref={register({ required: true })} />
            {errors.albumName && "Name of the Album is required."}
            <label>
              <h3>Category</h3>
            </label>
            <input type="text" name="category" ref={register({ required: true })} />
            {errors.category && "Category of the Album is required."}
            <label>
              <h3>Description</h3>
            </label>
            <input
              type="text"
              name="description"
              ref={register({ required: true })}
            />
            {errors.description && "Description is required."}
            <label>
              <h3>Upload</h3>
            </label>
            <input
              name="image"
              ref={register}
              required
              type="file"
              name="image"
            />
            {errors.image && <p>{errors.image.message}</p>}
            <br></br>
            <button>
              <h3>Submit</h3>
            </button>
          </form>
        </div>
      </div>
    </Fade>
  );
}
