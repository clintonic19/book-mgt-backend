const express = require('express');
const { createBook, getAllBooks, updateBook, 
        getABook, searchBook, deleteBook } = require('../../controllers/bookControllers/bookController');

const verifyAdminToken = require('../../middlewares/VerifyToken');
// const authMiddleware = require('../../middlewares/VerifyToken');
const router = express.Router();

//POST BOOK API
router.post('/create-book', verifyAdminToken, createBook);
router.get("/", getAllBooks);
router.get('/search', searchBook)
router.get("/:id", getABook);
router.put('/edit/:id', verifyAdminToken, updateBook);
router.delete('/delete/:id', verifyAdminToken, deleteBook);

module.exports = router;