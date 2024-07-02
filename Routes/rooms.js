const express = require('express');
const { getRooms, createRoom } = require('../controllers/roomController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getRooms);
router.post('/', auth, createRoom);

module.exports = router;
