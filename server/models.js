const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
    results: {
        wins: {
            type: Number,
            default: 0,
        },
        loses: {
            type: Number,
            default: 0,
        },
        ties: {
            type: Number,
            default: 0,
        }
    },
    rock: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    scissors: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
})

mongoose.connect("mongodb://localhost:27017/rps", {useNewUrlParser: true}, (errs)=>console.log(errs?errs:"db is fine"));

module.exports = mongoose.model("Action", ActionSchema)