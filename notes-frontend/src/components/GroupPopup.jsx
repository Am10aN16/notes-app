import React, { useState } from 'react';
import styled from 'styled-components';
import { createGroup } from '../api';

const GroupPopup = ({ onClose, onGroupCreated }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createGroup({ name, color });
        onGroupCreated(response.data);
        onClose();
    };

    return (
        <PopupOverlay onClick={onClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()}>
                <PopupHeader>Create New Group</PopupHeader>
                <form onSubmit={handleSubmit}>
                    <InputField>
                        <label>Group Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </InputField>
                    <InputField>
                        <label>Group Color</label>
                        <ColorPickerContainer>
                            <ColorPreview color={color} />
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </ColorPickerContainer>
                    </InputField>
                    <ButtonContainer>
                        <SubmitButton type="submit">Create Group</SubmitButton>
                    </ButtonContainer>
                </form>
            </PopupContainer>
        </PopupOverlay>
    );
};

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
`;

const PopupHeader = styled.h3`
    margin-bottom: 20px;
`;

const InputField = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;

const ColorPickerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ColorPreview = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background: ${({ color }) => color};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background: #001F8B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #004080;
    }
`;

export default GroupPopup;
