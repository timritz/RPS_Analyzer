const Actions = require("./model2.js")
module.exports = {
    Retrieve: (req,res)=>Actions.find({})
    .then(data=>console.log("retrieve all tasks")||res.json(data))
    .catch(errs=>console.log("Retrive errors")||res.json(errs)),

    RetrieveSingle: (req,res)=>Actions.find({_id: req.params.id})
    .then(data=>console.log("retrieve single task")||res.json(data))
    .catch(errs=>console.log("RetriveSingle errors")||res.json(errs)),

    New: (req,res)=>Actions.create(req.body)
    .then(data=>console.log("created new task")||res.json(data))
    .catch(errs=>console.log("New errors")||res.json(errs)),

    Update: (req, res)=>Actions.update({_id: req.params.id}, req.body, {new:true, runValidators: true})
    .then(data=>console.log("updated task")||res.json(data))
    .catch(errs=>console.log("New errors")||res.json(errs)),

    Delete: (req, res)=>Actions.remove({_id: req.params.id})
    .then(data=>console.log("deleted task")||res.json(data))
    .catch(errs=>console.log("New errors")||res.json(errs)),

    DeleteAll: (req, res)=>Actions.remove({})
    .then(data=>console.log("deleted all task")||res.json(data))
    .catch(errs=>console.log("New errors")||res.json(errs)),
}