import axios from 'axios';

const api = axios.create({
    baseURL: 'https://notes-app-lsdn.onrender.com/api'
});

export const createGroup = (data) => api.post('/groups/create', data);
export const getGroups = () => api.get('/groups');
export const createNote = (data) => api.post('/notes/create', data);
export const getNotes = (groupId) => api.get(`/notes/${groupId}`);
