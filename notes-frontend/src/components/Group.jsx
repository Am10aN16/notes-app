import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './NoteList';
import NoteInput from './NoteInput';

const Group = ({ selectedGroup }) => {
    const [notes, setNotes] = useState([]);
    console.log(selectedGroup);

    useEffect(() => {
        if (selectedGroup) {
            const fetchNotes = async () => {
                const response = await axios.get(`/api/notes?groupId=${selectedGroup._id}`);
                setNotes(response.data);
                console.log('response',response.data);
            };
            fetchNotes();
        }
    }, [selectedGroup]);

    const handleAddNote = (newNote) => {
        setNotes([...notes, newNote]);
    };

    console.log('selectedGroup');
    return (
        <div className="group">
            {selectedGroup ? (
                <>
                    <h2>{selectedGroup.name}</h2>
                    <NoteList notes={notes} />
                    <NoteInput groupId={selectedGroup._id} onAddNote={handleAddNote} />
                </>
            ) : (
                <div className="placeholder">
                    <img src="your-image-url-here" alt="Placeholder" />
                </div>
            )}
        </div>
    );
};

export default Group;
