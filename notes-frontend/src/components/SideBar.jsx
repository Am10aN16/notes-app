import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getGroups } from '../api';

const Sidebar = ({ onGroupSelect, onAddGroup }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await getGroups();
            setGroups(response.data);
        };
        fetchGroups();
    }, [onAddGroup]);

    return (
        <SidebarContainer>
            <SidebarHeader>Pocket Notes</SidebarHeader>
            <GroupList>
                {groups.map(group => (
                    <GroupItem key={group._id} onClick={() => onGroupSelect(group._id)}>
                        <ColorDot color={group.color}>
                            {group.name.charAt(0)}
                        </ColorDot>
                        {group.name}
                    </GroupItem>
                ))}
            </GroupList>
            <AddGroupButton onClick={onAddGroup}>+</AddGroupButton>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    width: 300px;
    padding: 20px;
    background: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    position: relative;
`;

const SidebarHeader = styled.h2`
    margin-bottom: 20px;
`;

const GroupList = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const GroupItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #e0e0e0;
    }
`;

const ColorDot = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ color }) => color};
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
`;

const AddGroupButton = styled.button`
    position: absolute;
    bottom: 60px;
    right: 20px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #16008B;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #004080;
    }
`;

export default Sidebar;
