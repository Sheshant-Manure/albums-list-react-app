import { useEffect, useState, useRef } from 'react';
import './Assets/style.css';

function App() {
  // Declare the albums state variable and a function to update it
  const [albums, setAlbums] = useState([]);

  const userIdRef = useRef(null);
  const titleRef = useRef(null);

  const addAlbum = (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
    const title = titleRef.current.value;

    // Defining the album object to update the state and send to the server
    const album = { id: albums.length, userId, title }
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
          console.log(data);
        }
      } catch (error) {
        console.log('Something went wrong! The API requested returned an error:', error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
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
        </div>
        <div className='delete-album'>
          <h2>Delete an album</h2>
        </div>
      </div>
      {/* Showing all the Albums in a flex-box container */}
      <div className='container'>
        <ol>
          {albums.map((album, i)=>(
            <div key={i} className='album-box'>
              <li>{album.title}</li>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
