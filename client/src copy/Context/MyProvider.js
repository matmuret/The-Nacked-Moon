import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';

export default function MyProvider(props) {
    const [getPhotosets, setGetPhotosets] = useState([])
    const [getPhotos, setGetPhotos] = useState([])
    const [newAlbum,setNewAlbum]=useState({message:'',createdAlbum:{}})
    const [getData,setGetData]=useState([{ images: []}])
    const [getAlbum,setGetAlbum]=useState({ images: []})

   /*  useEffect(() => {
        fetch("https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=096b22d31620a00facef34e46773fda7&user_id=190275209%40N08&extras=url_m,url_l&format=json&nojsoncallback=1")
            .then(res => res.json())
            .then(myData => setGetPhotos(myData.photos.photo))
            .catch(err => err.message)
        fetch("https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=096b22d31620a00facef34e46773fda7&user_id=190275209%40N08&primary_photo_extras=url_m&format=json&nojsoncallback=1")
            .then(res => res.json())
            .then(myData2 => setGetPhotosets(myData2.photosets.photoset))
            .catch(err => err.message)
    }, []); */

 

    return (
        
        <MyContext.Provider value={{getAlbum,setGetAlbum, getData,setGetData, getPhotosets, setGetPhotosets, getPhotos, setGetPhotos, newAlbum, setNewAlbum }}>
            {props.children}
        </MyContext.Provider>
    )
}
