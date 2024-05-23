const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.get('/', function(req, res) {
  console.log(req.body.message);
  res.json({
    output:4
  })
})

app.post("/conversation", function(req,res){
    res.send("conversation sent");
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})