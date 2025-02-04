// Create web server
// npm install express
// npm install body-parser
// npm install mongoose

// 1. Include required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 2. Create an instance of express server
var app = express();

// 3. Include body-parser middleware
app.use(bodyParser.json());

// 4. Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// 5. Define a schema
var CommentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String,
    created_at: { type: Date, default: Date.now }
});

// 6. Define a model
var CommentModel = mongoose.model('Comment', CommentSchema);

// 7. Define routes
// GET /comments
app.get('/comments', function (req, res) {
    CommentModel.find({}, function (err, comments) {
        if (err) throw err;
        res.json(comments);
    });
});

// POST /comments
app.post('/comments', function (req, res) {
    var comment = new CommentModel(req.body);
    comment.save(function (err) {
        if (err) throw err;
        res.json(comment);
    });
});

// 8. Start the server
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});

// 9. Test the server
// Open Postman and test the server using GET and POST requests
// GET http://localhost:3000/comments
// POST http://localhost:3000/comments
// Body: { "name": "John", "email": "