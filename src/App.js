import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const notesPerPage = 10;

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const timestamp = new Date().toISOString();
    setNotes([...notes, { ...newNote, id: Date.now(), timestamp }]);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? { ...updatedNote, timestamp: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <h1>Simple Note Taking App</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NoteForm addNote={addNote} updateNote={updateNote} editingNote={editingNote} setEditingNote={setEditingNote} />
      <NoteList
        notes={currentNotes}
        deleteNote={deleteNote}
        setEditingNote={setEditingNote}
      />
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={filteredNotes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;