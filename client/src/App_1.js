import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/forums')
      .then(response => {
        setForums(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Forum Titles and Comments</h1>
      <ul>
        {forums.map(forum => (
          <li key={forum.id}>
            <strong>{forum.title}</strong> - {forum.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
