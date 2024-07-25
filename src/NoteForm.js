import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, updateNote, editingNote, setEditingNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        if (editingNote) {
            updateNote({ ...editingNote, title, content });
        } else {
            addNote({ title, content });
        }

        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button type="submit">{editingNote ? 'Update Note' : 'Add Note'}</button>
            {editingNote && (
                <button type="button" onClick={() => setEditingNote(null)}>
                    Cancel Edit
                </button>
            )}
        </form>
    );
};

export default NoteForm;