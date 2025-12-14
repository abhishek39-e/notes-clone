import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // add note
  const addNotes = async () => {
    if (!title || !content) return alert('Fill all fields');

    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    setTitle('');
    setContent('');
    fetchNotes();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Notes App</h2>

      <input
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <textarea
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <br />

      <button onClick={addNotes}>Add Note</button>

      <hr />

      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
