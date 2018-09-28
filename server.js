const express = require("express")
const app = express();
const path = require("path")

require("./server/routes.js")(app)
app.use(express.static(__dirname + "/Main/dist/Main"));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./Main/dist/Main/index.html"))
});

app.listen(8000, function(){
    console.log("Listening on 8000")
})