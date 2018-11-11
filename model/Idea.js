const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    title:{
        type:String,
        
    },
    details:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Idea = mongoose.model('ideas',IdeaSchema);
//if error occered remove the export functionality
module.exports = {Idea};