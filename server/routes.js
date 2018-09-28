const mongoose = require("mongoose")
const actions = require("./controllers.js");
const bp = require("body-parser")

module.exports = function(app){
    app.use(bp.json())
    app.get("/api/actions", function(req,res){
        actions.Retrieve(req, res);
    })

    app.get("/api/actions/:id", function(req,res){
        actions.RetrieveSingle(req,res)
    })

    app.post("/api/actions", function(req,res){
        actions.New(req,res)
    })

    app.put("/api/actions/:id", function(req,res){
        actions.Update(req,res)
    })


    app.delete("/api/actions/:id", function(req, res){
        actions.Delete(req, res)
    })

    app.delete("/api/actions/delete/nuclear", function(req, res){
        actions.DeleteAll(req, res)
    })
}