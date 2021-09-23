const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryoneDB');
const Schema = mongoose.Schema;

 

var NewAuthorSchema = new Schema(
    {
        id:String,
        authorName : String,
        authorBook:String,
        genre: String,
        imageUrl: String
    }
   
);

var AuthorData= mongoose.model('author',NewAuthorSchema);

module.exports = AuthorData