import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [forums, setForums] = useState([]);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/forums')
      .then(response => {
        setForums(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/forums', { title, comment })
      .then(response => {
        setForums([...forums, response.data]);
        setTitle('');
        setComment('');
      })
      .catch(error => console.error('Error posting data:', error));
  };

  return (
    <div>
      <h1>Forum Titles and Comments</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          required
        />
        <button type="submit">Post</button>
      </form>
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
