import { useEffect } from 'react';
import './Assets/style.css'

function App() {

  useEffect( () => {

    // Fetching data from API using GET request method (since no data is sent from the client)
    const fetchAPI = async () =>{
      try {

        const APIrequest = await fetch('https://jsonplaceholder.typicode.com/albums', { method: 'GET' });
        if (!APIrequest.ok) {
          // Check if the response is not OK (e.g., 404 or 500 error) and throw an error
          throw new Error('API request failed with status: ' + APIrequest.status);
        }
        else {
          const data = await APIrequest.json();
          console.log(data);  
        }
      } 
      // Handling the error
      catch (error) {
        console.log('Something went wrong! the API requested returned an error:', error);
      }
    }
    fetchAPI();
  }, []);

  return (
    <>
      <div className='container'>

      </div>
    </>
  )
}

export default App;
