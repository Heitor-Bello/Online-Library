const express = require('express');
const { getAllUsers, getUserById, getUserProfile, addUserToCollection } = require('../../controllers/usersColection/usersController');

const router = express.Router();

router.get('/', getAllUsers); //GET /api/users
router.get('/:id', getUserById); //GET /api/users/:id

module.exports = router;