const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/db');
const {Idea} = require('./model/Idea');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',(req,res)=>
{
    res.render('home',{
        title:" Welcome "
    });
})

app.get('/about',(req,res)=>
{
    res.render('about');
})

app.get('/ideas/add',(req,res)=>
{
    res.render('ideas/add');
})

app.post('/ideas/add',(req,res)=>
{
    let errors = [];
    let title = req.body.title;
    let details = req.body.details;
    console.log(JSON.stringify(req.body.title,undefined,2));
   
   if (title.length<2)
     {
        errors.push({ text: 'Title not valid !'})   
     }
    if (details.length < 2) {
        errors.push({ text: 'Details not valid !' })
    }
    if (! title) {
        errors.push({text:'Text is required'})
    }
    if (! details) {
        errors.push({ text: 'Details : Details is required' })
    }
    // if (! typeOf(title) === "string") {
    //     errors.push({ text: 'Dont use numbers !' });
    // }
    // if (!typeOf(details) === "string") {
    //     errors.push({ text: "Dont use numbers !" });
    // }

    if (errors.length > 0)
    {
        res.render('ideas/add',{
          errors,
          title,
          details
      });   
    }
    else{
        res.send('pass');
    }

})

const Port = process.env.process || 3000;

app.listen(Port, () => {
    console.log(` App listening on port : ${Port}!`);
});