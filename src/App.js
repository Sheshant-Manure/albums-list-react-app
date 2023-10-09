import { useEffect, useState, useRef } from 'react';
import './Assets/style.css';

function App() {
  // Declare the albums state variable and a function to update it
  const [albums, setAlbums] = useState([]);

  // Creating refs to add new album
  const userIdRef = useRef(null);
  const titleRef = useRef(null);

  // Creating refs to update existing album
  const updAlbumIdRef = useRef(null);
  const updTitleRef = useRef(null);
  const updUserIdRef = useRef(null);

  // Creating ref to delete an album
  const delAlbumIdRef = useRef(null);

  // Adding a new album
  const addAlbum = (e) => {
    e.preventDefault();

    // Getting the values from input fields
    const userId = userIdRef.current.value;
    const title = titleRef.current.value;

    // Defining the album object to update the state and send to the server
    const album = { id: albums.length+1, userId, title }
    setAlbums([...albums, album])

    // Adding a new album to the server using API POST request
    fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'POST',
    body: JSON.stringify(
      album
    ),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

    // clearing the form after updating the state and server with a new album
    userIdRef.current.value = '';
    titleRef.current.value = '';

  }

  // Updating existing album (changing the title)
  const updateAlbum = (e) => {
    e.preventDefault();
    // Getting the values from input fields
    const id = +updAlbumIdRef.current.value;
    const title = updTitleRef.current.value;
    const userId = +updUserIdRef.current.value;

    // Updating the state
    const updatedAlbum = { userId, id, title }
    setAlbums((prevAlbums) => {
      return prevAlbums.map((album) => {
        if (album.id === updatedAlbum.id && album.userId === updatedAlbum.userId) {
          return updatedAlbum;
        } else {
          return album;
        }
      })
    });

    // Updating existing album in the server using API PUT request method
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: 'PUT',
    body: JSON.stringify(
      updatedAlbum
    ),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
      
  }

  // Delete album 
  const deleteAlbum = (e) => {
    e.preventDefault();
    const id = +delAlbumIdRef.current.value;
    setAlbums((prevAlbums)=>{
      return 	prevAlbums.filter((album)=>album.id!==id);
    })

    // Deleting album in server using API DELETE request method
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
    .then((response) => response.json())
    .then((json) => console.log(json));

    delAlbumIdRef.current.value = '';
  }
  useEffect(() => {
    // Fetching data from API using GET request method (since no data is sent from the client)
    const fetchAPI = async () => {
      try {
        const APIrequest = await fetch('https://jsonplaceholder.typicode.com/albums', { method: 'GET' });
        if (!APIrequest.ok) {
          // Check if the response is not OK (e.g., 404 or 500 error) and throw an error
          throw new Error('API request failed with status: ' + APIrequest.status);
        } else {
          const data = await APIrequest.json();
          // Update the 'albums' state with the fetched data
          setAlbums(data);
        }
      } catch (error) {
        console.log('Something went wrong! The API requested returned an error:', error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      <h1 id='title'>Albums List React App</h1>
      <div className='forms-container'>
        <div className='add-album'>
          <h2>Add an album</h2>
          <form onSubmit={addAlbum}>
            <input ref={userIdRef} type='text' placeholder='User Id' required /><br />
            <input ref={titleRef} type='text' placeholder='Title' required /><br />
            <button type='submit'><b>Add Album</b></button>
          </form>
        </div>

        <div className='update-album'>
          <h2>Update an album</h2>
          <form onSubmit={updateAlbum}>
            <input ref={updUserIdRef} type='text' placeholder='User Id' required /><br />
            <input ref={updAlbumIdRef} type='text' placeholder='Album Id' required /><br />
            <input ref={updTitleRef} type='text' placeholder='New Title' required /><br />
            <button type='submit'><b>Update Album</b></button>
          </form>
        </div>

        <div className='delete-album'>
          <h2>Delete an album</h2>
          <form onSubmit={deleteAlbum}>
            <input ref={delAlbumIdRef} type='text' placeholder='Album Id' required /><br />
            <button type='submit'><b>Delete Album</b></button>
          </form>
        </div>
      </div>

      {/* Showing all the Albums in a flex-box container */}
      <div className='container'>
        <ol>
          {albums.map((album, i)=>(
            <div key={i} className='album-box'>
              <li><b>{album.title}</b></li>
              <div><small>Album Id: {album.id}</small></div>
              <div><small>User Id: {album.userId}</small></div>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
