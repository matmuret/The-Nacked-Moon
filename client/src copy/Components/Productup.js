import React from "react";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";

export default function Productup() {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  const onSubmit = async (data) => {
    if (data.image && data.image.length > 0) {
      data.image = data.image[0];
    }
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    const res = await fetch("http://localhost:5000/api/Shop", {
      method: "POST",
      body: formData,
    });
    const fromApi = await res.json();
    alert("Check among the products");
    console.log(fromApi);
  };

  return (
    <Fade bottom cascade={true}>
      <div className="authContainer">
        <div className="form2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h3>Name</h3>
            </label>
            <input type="text" name="name" ref={register({ required: true })} />
            {errors.name && "Name is required."}
            <label>
              <h3>Category</h3>
            </label>
            <input type="text" name="category" ref={register} />
            <label>
              <h3>Description</h3>
            </label>
            <textarea
              type="text"
              name="description"
              ref={register({ required: true })}
            />
            {errors.description && "Description is required."}
            <label>
              <h3>Price</h3>
            </label>
            <input
              type="text"
              name="price"
              ref={register({ required: true })}
            />
            <label>
              <h3>In Stock</h3>
            </label>
            <input
              type="text"
              name="countInStock"
              ref={register({ required: true })}
            />
            {errors.name && "How many products are in Stock?"}
            <label>
              <h3>Rating</h3>
            </label>
            <input type="text" name="rating" ref={register} />

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
            <button type="submit">
              <h3>Submit</h3>
            </button>
          </form>
          <br></br>
        </div>
      </div>
    </Fade>
  );
}
