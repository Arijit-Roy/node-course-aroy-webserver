const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (str)=>{
    return str.toUpperCase();
});


app.use((req, res, next)=>{
    var now = new Date().toString();
    
    fs.appendFile('server.log', `${now} : ${req.method} : ${req.url}`+'\n', (err)=>{
        if(err){
            console.log(err);
        }
    });
    console.log();
    
    
    next();
});

//app.use((req, res, next)=>{
//    res.render('maintenance.hbs');
//});
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response)=>{
    // response.send('<h1>Hello Express</h1>');
    response.send({
        name:"Arijit", 
        likes:[
            "swimming", "trekking"
        ]
    })
});

app.get('/about', (request, response) =>{
    response.render('about.hbs', {
        pageTitle : "About Page", 
    });
});

app.listen(port, ()=>{
    console.log(`Server is up and running ${port}`);
});