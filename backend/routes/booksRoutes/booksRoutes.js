const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../../controllers/booksColection/booksController');
const router = express.Router();

router.get('/:id',getBookById) // GET /api/books/:id
router.get('/', getAllBooks); //GET /api/books
router.post('/', addBook); //POST /api/books
router.put('/:id', updateBook) //PUT /api/books/:id
router.delete('/:id', deleteBook) //DELETE /api/books/:id

module.exports = router;