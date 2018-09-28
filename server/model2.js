const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0
    },
    ties: {
        type: Number,
        default: 0
    },
    won: {
        type: mongoose.Schema.Types.ObjectId
    },
    lost: {
        type: mongoose.Schema.Types.ObjectId
    },
    tied: {
        type: mongoose.Schema.Types.ObjectId
    },
})

const OutcomeSchema = new mongoose.Schema({
    rock: {
        type: InfoSchema,
        default: InfoSchema
    },
    paper: {
        type: InfoSchema,
        default: InfoSchema
    },
    scissors: {
        type: InfoSchema,
        default: InfoSchema
    },

})

mongoose.connect("mongodb://localhost:27017/RockPaperScissors", {useNewUrlParser: true}, (errs)=>console.log(errs?errs:"db is fine"));

module.exports = mongoose.model("Outcome", OutcomeSchema)