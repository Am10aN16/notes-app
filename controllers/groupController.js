const Group = require('../models/Group');

const createGroup = async (req, res) => {
    const { name, color } = req.body;
    try {
        const newGroup = new Group({ name, color });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createGroup, getGroups };
