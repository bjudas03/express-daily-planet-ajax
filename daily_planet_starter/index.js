var express = require('express');
var partials = require('express-partials'); // https://github.com/publicclass/express-partials
var bodyParser = require('body-parser');
var app = express();

app.use(partials());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

var articles = [
    { title: 'Bernie! Bernie!', body: '#feelthebern' },
    { title: 'Trump for change!', body: 'Make America Great Again' },
    { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/articles', function(req, res) {
    res.render('articles/index', { articles: articles });
});

app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
        res.render('articles/show', { article: articles[req.params.index] });
    } else {
        res.send('Error');
    }
});

app.post('/articles', function(req, res) {
    articles.push(req.body);
    res.redirect('/articles');
});

app.get('/about', function(req, res) {
    res.render('about');
});

// app.get('/articles/edit/id', function(req, res) {
//     console.log('I am in the get route');
//     // console.log(req.params.body);
//     // res.render('/articles/edit' ,({article: articles[req.params.id], idx: req.params.id }));
// });


//edit the articles
// app.put('/articles/edit/:id', function(req, res) {
//     var articleId = parseInt(req.params.id);
//     console.log(articleId);
//     articles[articleId].title = req.body.title;
//     articles[articleId.body] = req.body.body;
//     res.send({message: 'success'});
// });

app.delete('/articles/:id', function(req, res){
    var articleId = parseInt(req.params.id);
    console.log(articleId);
    articles.splice(articleId,1);
    res.send({message: 'articleDeleteSuccess'})
    res.redirect('/articles');
});




app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
