const Note = require('../models/Note');

const createNote = async (req, res) => {
    const { groupId, content } = req.body;
    try {
        const newNote = new Note({
            groupId,
            content,
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotesByGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const notes = await Note.find({ groupId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createNote, getNotesByGroup };
