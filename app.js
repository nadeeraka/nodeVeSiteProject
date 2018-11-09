const express = require('express');
const exphbs  = require('express-handlebars');


const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>
{
    res.render('home',{
        title:" welcome to handlebars"
    });
})

const Port = process.env.process || 3000;

app.listen(Port, () => {
    console.log(` App listening on port : ${Port}!`);
});