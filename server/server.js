const path = require('path');
const express = require('express')
var bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"static")))
app.use('/',require(path.join(__dirname,'routes/todoroutes.js')))

app.listen(4000,()=>{
    console.log('Server started on port 4000')
})