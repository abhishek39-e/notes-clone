import { useState, useEffect } from 'react';
import './App.css';
import Nav from '../comp/Nav';
import Searchinput from '../comp/Searchinput';

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
    <div className='maindiv'>
      {/* <Nav />
      <Searchinput /> */}
      <div className='notes-div w-full flex flex-col items-center p-3'>
        <h2>Notes App</h2>

        <input
          id='input-title'
          className='p35'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />

        <textarea
          id='content-area'
          className='p35'
          placeholder='Content'
          value={content}
          name='content'
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />

        <button
          className='p35 bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-600 border border-gray-600'
          onClick={addNotes}
        >
          Add Note
        </button>
      </div>
      <hr />
      <div className='shownotes flex gap-5 justify-center p-3 flex-wrap'>
        {notes.map((note) => (
          <div className='note py-3 px-5 bg-gray-800 rounded-md' key={note._id}>
            <h3 className='text-lg font-semibold'>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
