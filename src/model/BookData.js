const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryoneDB');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema(
    {
       
        bookName:String,
        bookAuthor:String,
        genre:String,
        imageUrl: String
})

var BookData = mongoose.model('book',NewBookSchema);

module.exports = BookData;