const express = require('express');

//LOCAL IMPORTS
const Book = require("../../models/booksModel/booksModel")

//POST BOOK API CONTROLLER FUNCTION 
const createBook = async (req, res) => {
    try {
        //DESTRUCTURE REQUEST BODY
       const {  title, description, category, trending, coverImage, oldPrice, newPrice } = req.body;

        //CREATE NEW BOOK
       const book =  new Book({title, description, category, trending, coverImage, oldPrice, newPrice });
        //SAVE BOOK
         await book.save();
            res.status(201).json({message: "Book created successfully", book });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot create book"});
    }
};

//GET ALL BOOKS API CONTROLLER FUNCTION
const getAllBooks = async(req, res) =>{
   try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({message: "All books", books});
   } catch (error) {
         console.log(error);
         res.status(500).json({message: "Cannot get books"});
   }
    
};

//GET A BOOK API CONTROLLER FUNCTION
const getABook = async(req, res)=>{
    try {
        const bookId = req.params.id;
        const book = await Book.findById({_id: bookId});
        if(book){
            res.status(200).json({message: "Book found", book});
        }else{
            res.status(404).json({message: "Book not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Book ID is invalid"});
        
    }
}


//UPDATE BOOK API CONTROLLER FUNCTION
const updateBook = async(req, res) =>{
    try {
        // const bookId = req.params.id;
        // const { title, description, category, trending, coverImage, oldPrice, newPrice } = req.body;
        // //FIND BOOK BY ID AND UPDATE
        // const books = await Book.findByIdAndUpdate({_id: req.params.bookId, ...req.body,}, {new: true});
        // if(books){
        //     books.title = title;
        //     books.description = description;
        //     books.category = category;
        //     books.trending = trending;
        //     books.coverImage = coverImage;
        //     books.oldPrice = oldPrice;
        //     books.newPrice = newPrice;
        //     await books.save();
        //     res.status(200).json({message: "Book updated successfully", books});
        // }else{
        //     res.status(404).json({message: "Book not found"});
        // }; 

        const bookId = req.params.id;
        const { title, description, category, trending, coverImage, oldPrice, newPrice } = req.body;
        
        // FIND BOOK BY ID AND UPDATE
        const book = await Book.findByIdAndUpdate(
            bookId, 
            {
                title,
                description,
                category,
                trending,
                coverImage,
                oldPrice,
                newPrice
            }, 
            { new: true }
        );
        
        if (book) {
            res.status(200).json({ message: "Book updated successfully", book });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
        
        } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot update book"});
    }
};


//DELETE BOOK API CONTROLLER FUNCTION
const deleteBook = async(req, res) => {
    try {
        const bookId = req.params.id;
        //FIND BOOK BY ID AND DELETE
        const book = await Book.findByIdAndDelete({_id: bookId});
        if(book){
            res.status(200).json({message: "Book deleted successfully"});
    } else {
        res.status(404).json({message: "Unable to delete book"});
    }

    }catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot update book"});
    }
}

module.exports = { createBook, getAllBooks, updateBook, getABook, deleteBook };