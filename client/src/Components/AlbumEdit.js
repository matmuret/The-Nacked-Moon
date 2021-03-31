import React, { Fragment, useContext, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

export default function AlbumEdit(props) {
  const { newAlbum, setNewAlbum } = useContext(MyContext);
  const { register, handleSubmit } = useForm(); // initialize the hook
  const { id } = useParams();
  const history = useHistory();
  /* console.log({ newAlbum }); */

  // get the album info first
  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/albumup/${id}`);
        const albums = await res.json();
        console.log(albums);
        setNewAlbum(albums);
      } catch (err) {}
    };
    getResult();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    /* console.log({ data }); */
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    /*  formData.append("images", data.images); */
    /*  for (const image of data.image) {
      formData.append('image[]', image)
   } */
    /* const data={ ...images, ...newAlbum} */
    for (let key in newAlbum) {
      //creates a loop iterating over arrays
      formData.append(key, newAlbum[key]);
    }
    /* console.log({data}) */
    const res = await fetch(`http://localhost:5000/api/albumup/${newAlbum._id}`, {
      method: 'PUT',
      body: formData,
    });
    const fromApi = await res.json();
    /* console.log(fromApi); */
    formData.delete('images');
    setNewAlbum(fromApi.updatedAlbum);
    /* setNewAlbum({ ...newAlbum, images: fromApi.createdAlbum.images }); */
  };

  const Delete = (url) => {
    //to be implemented
  };

  const DeleteAlbum = async (e) => {
      e.preventDefault();
      const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
          'Content-type': 'application/json', // Indicates the content
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
 /*  }; */
  console.log('rerendering', newAlbum);
  return (
    <Fragment>
      <div style={{ textAlign: 'center' }}>
        <h1 className='VisionTitle'>
          photos in <span style={{ color: 'red' }}>{newAlbum.albumName}</span> <br></br>{' '}
          click on one photo to delete{' '}
        </h1>

        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type='submit'>
            <h3>Add photo</h3>
          </button>
          <button type='submit' onClick={(e) => DeleteAlbum(e)}>
            <h3>Delete Album</h3>
          </button>

          {/* <div style={{margin:"auto", }}> */}
          <input name='images' ref={register} required type='file' multiple />
          {/* </div> */}
        </form>
      </div>
      <div className='soulsContainer'>
        {newAlbum.images &&
          newAlbum.images.map((url) => {
            return (
              <img
                /* onClick={() => Delete(item)} */
                className='soulsItems'
                src={url}
                key={url}
                /* image={item.url_l} */
              />
            );
          })}
      </div>
    </Fragment>
  );
}
