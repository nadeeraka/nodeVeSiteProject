const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/veApp',{
    useNewUrlParser:true
})
.then(()=>console.log("Connected"))
.catch((e)=>console.log('Unable to connect ',e));

module.exports = {mongoose};