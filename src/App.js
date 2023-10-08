import { useEffect, useState } from 'react';
import './Assets/style.css';

function App() {
  // Declare the albums state variable and a function to update it
  const [albums, setAlbums] = useState([]);

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
      <div className='container'>
        <ol>
          {albums.map((album)=>(
            <div className='album-box'>
              <li key={album.id}>{album.title}</li>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
