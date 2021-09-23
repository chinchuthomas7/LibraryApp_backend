
const express = require('express');

const BookData = require('./src/model/BookData');
const AuthorData = require('./src/model/AuthorData');

const cors = require('cors');

// npm install jsonwebtoken
const jwt= require('jsonwebtoken');

var app = new express();

app.use(cors());

app.use(express.json());

// setting login credentials

username="admin"
password="1234"



// middleware for verifying token

function verifyToken(req, res, next)
{

if(!req.headers.authorization)
{
    return res.status(401).send('Unauthorized Request')
}
let token=req.headers.authorization.split('')[1]
if (token === 'null'){
    return res.status(401).send('Unauthorized request')
}
let payload = jwt.verify(token,'secretKey')
console.log(payload)
if(!payload){
    return res.status(401).send('Unauthorized request')
}
req.userId=payload.subject
next()
}

// to login

app.post('/login',(req,res)=>{
    let userData = req.body

    if (!username){
        res.status(401).send('invalid username')
    }
    else
    if(password !== userData.password){
        res.status(401).send('Invalid Paasword')
    }
        else 
        {
            let payload = {subject:username+password}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    
})

// to get books list

app.get('/books', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    BookData.find()
        .then(function (books) {
            res.send(books)
        })
})



// to select a particular book using id

app.get('/books/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    const id = req.params.id;
    BookData.findOne({"_id":id})
    .then (function(book){
        res.send(book);
    })
    
})

// to add book

app.post('/addbook',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var book ={
        bookName :req.body.book.bookName,
        bookAuthor : req.body.book.bookAuthor,
        genre : req.body.book.genre,
        imageUrl:req.body.book.imageUrl
    }
    var book= new BookData(book)
    book.save();
})

// to edit book/update book details

app.put('/updatebook',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    console.log(req.body)
    id=req.body._id,
    bookName = req.body.bookName,
    bookAuthor = req.body.bookAuthor,
    genre = req.body.genre,
    imageUrl = req.body.imageUrl

    BookData.findByIdAndUpdate({"_id":id},
    {$set:{"bookName":bookName,
    "bookAuthor":bookAuthor,
    "genre":genre,
    "imageUrl":imageUrl}})
.then(function(){
res.send();
})
}
)

// to delete a particular book

app.delete('/removebook/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
})


// to get authors list

app.get('/authors', function (req, res) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    AuthorData.find()
        .then(function (authors) {
            res.send(authors)
        })
})

// to get a particular author

app.get('/authors/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    const id = req.params.id;
    AuthorData.findOne({"_id":id})
    .then (function(author){
        res.send(author);
    })
    
})



// to add author

app.post('/addauthor',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var author ={
        authorName : req.body.author.authorName,
        authorBook:req.body.author.authorBook,
        genre: req.body.author.genre,
        imageUrl: req.body.author.imageUrl
    }
    var author= new AuthorData(author)
    author.save()
})

// to update a particular author details


app.put('/updateauthor',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    console.log(req.body)
    id=req.body._id,
    authorName = req.body.authorName,
    authorBook = req.body.authorBook,
    genre = req.body.genre,
    imageUrl = req.body.imageUrl

    AuthorData.findByIdAndUpdate({"_id":id},
    {$set:{"authorName":authorName,
    "authorBook":authorBook,
    "genre":genre,
    "imageUrl":imageUrl}})
.then(function(){
res.send();
})
}
)

// to delete an author

app.delete('/removeauthor/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")

    id = req.params.id;
    AuthorData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
})






app.listen(8000, function () {
    console.log('listening to port 8000');
})