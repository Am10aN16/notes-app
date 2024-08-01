const express = require('express');
const router = express.Router();
const { createNote, getNotesByGroup } = require('../controllers/noteController');

router.post('/create', createNote);
router.get('/:groupId', getNotesByGroup);

module.exports = router;
