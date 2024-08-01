import React from 'react';
import styled from 'styled-components';

const NoteList = ({ notes, backgroundColor }) => {
    return (
        <NotesContainer>
            {notes.map(note => (
                <NoteItem key={note._id} backgroundColor={backgroundColor}>
                    <NoteContent>{note.content}</NoteContent>
                    <NoteTimestamp>
                        {formatDate(note.createdAt)}
                    </NoteTimestamp>
                </NoteItem>
            ))}
        </NotesContainer>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
    return `${formattedDate}, ${formattedTime}`;
};

const NotesContainer = styled.div`
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
    width: 100%; 
    background: #DAE5F5;
    box-sizing: border-box;
`;

const NoteItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    background: #f9f9f9;
    border-radius: 4px;
    position: relative; /* Required for absolute positioning of timestamp */
    border-color: ${({ backgroundColor }) => backgroundColor};
`;

const NoteContent = styled.p`
    margin: 0;
`;

const NoteTimestamp = styled.span`
    font-size: 12px;
    color: #888;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

export default NoteList;
