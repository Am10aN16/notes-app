import React, { useState } from 'react';
import styled from 'styled-components';
import { createNote } from '../api';
import SendBtn from "../assets/send.png"

const NoteInput = ({ groupId, onNoteAdded, backgroundColor }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        const response = await createNote({ content, groupId });
        onNoteAdded(response.data);
        setContent('');
    };

    return (
        <NoteInputContainer backgroundColor={backgroundColor}>
            <Form onSubmit={handleSubmit}>
                <NoteTextArea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your note here..."
                    required
                />
                <SubmitButton type="submit" disabled={!content.trim()}>
                    <img src={SendBtn} alt="" srcset="" />
                </SubmitButton>
            </Form>
        </NoteInputContainer>
    );
};

const NoteInputContainer = styled.div`
    padding: 20px;
    background: ${({ backgroundColor }) => backgroundColor};
    position: fixed;
    bottom: 0;
    width: -webkit-fill-available;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
`;

const NoteTextArea = styled.textarea`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
    position: relative;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    color: white;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 36px;
    border-radius: 4px;
    &:disabled {
        background: #ccc;
    }
    &:hover:not(:disabled) {
        background: #fff;
    }
`;

export default NoteInput;
