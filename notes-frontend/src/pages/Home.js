import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList';
import GroupPopup from '../components/GroupPopup';
import { getGroups, getNotes } from '../api';
import styled from 'styled-components';
import Background from '../assets/background.png'

const Home = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupColor, setGroupColor] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            if (selectedGroupId) {
                const response = await getNotes(selectedGroupId);
                setNotes(response.data);
            }
        };
        fetchNotes();
    }, [selectedGroupId]);

    const handleGroupSelect = async (groupId) => {
        setSelectedGroupId(groupId);
        // Fetch and set the group name here if needed
        const response = await getGroups();
        const selectedGroup = response.data.find(group => group._id === groupId);
        setGroupName(selectedGroup ? selectedGroup.name : '');
        setGroupColor(selectedGroup ? selectedGroup.color : '#ffffff');
    };

    const handleNoteAdded = (newNote) => {
        setNotes(prevNotes => [...prevNotes, newNote]);
    };

    const handleGroupCreated = (newGroup) => {
        setSelectedGroupId(newGroup._id);
        setGroupName(newGroup.name);
    };

    return (
        <HomeContainer>
            <Sidebar
                onGroupSelect={handleGroupSelect}
                onAddGroup={() => setShowPopup(true)}
            />
            <ContentContainer>
                {selectedGroupId ? (
                    <>
                        <GroupHeader backgroundColor={groupColor}>{groupName}</GroupHeader>
                        <NoteList notes={notes} backgroundColor={groupColor} />
                        <NoteInput
                            groupId={selectedGroupId}
                            onNoteAdded={handleNoteAdded}
                            backgroundColor={groupColor}
                        />
                    </>
                ) : (
                    <NoGroupSelected>
                        <NoGroupImage src={Background} alt="No Group Selected" />
                            <NoGroupText><b>Pocket Notes</b> <br/>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</NoGroupText>
                    </NoGroupSelected>
                )}
            </ContentContainer>
            {showPopup && (
                <GroupPopup
                    onClose={() => setShowPopup(false)}
                    onGroupCreated={handleGroupCreated}
                />
            )}
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: flex;
    height: 100vh;
    @media (max-width: 300px) {
        flex-direction: column;
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #DAE5F5;
`;

const GroupHeader = styled.h2`
    margin: 0;
    background: ${({ backgroundColor }) => backgroundColor};
    padding: 10px;
`;

const NoGroupSelected = styled.div`
    font-size: 24px;
    color: #888;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 20px;
    background-color: #DAE5F5;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 10px;
    }
`;

const NoGroupImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
`;

const NoGroupText = styled.div`
    font-size: 24px;
    color: #000;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export default Home;
