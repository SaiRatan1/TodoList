const express = require('express')
const path = require('path')
const router = express.Router()
let student;
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const DB = 'mongodb+srv://SaiRatan:SaiRatan@cluster0.39xb8ki.mongodb.net/testDB?retryWrites=true&w=majority'


// const DB = 'mongodb+srv://newuser1:newuser1@cluster0.39xb8ki.mongodb.net/testDB?retryWrites=true&w=majority'



mongoose.connect(DB).then(()=>{console.log('Connection successfull')}).catch((err)=>{console.log(`Couldn't connect to database`)})

// mongoose.connect("mongodb://localhost:27017/messdb", { useNewUrlParser: true, useUnifiedTopology: true })

const studentschema = new mongoose.Schema({
    name: String,
    roll: String,
    phone: Number,
    password: String,
    todos:Array
})

const studentscollection = mongoose.model("studentscollection", studentschema);



router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const student = await studentscollection.findOne({ name: name, password: password }).exec();
    if (student) {

        res.json({ message: 'User login succesfull' })
    }
    else {
        res.status(400).json({ error: 'Invalid Credentials' })
    }
})


router.post('/signup', async    (req, res) => {
    let { name, roll, phone, password } = req.body;

    phone = parseInt(phone);
    const studentinfo = new studentscollection({
        name: name,
        roll: roll,
        phone: phone,
        password: password,
        todos:[]
    })
     studentinfo.save();

    res.status(201).json({ message: 'Signup successful' });

})

router.post('/todos', async(req, res) => {
    let newTodo = req.body.newTodos
    let name = req.body.name;
    let changestudent = await studentscollection.findOne({ name: name }).exec()
    if(changestudent.todos.length===0){
        changestudent.todos = newTodo
    }
    else{
        changestudent.todos = [...changestudent.todos,newTodo]
    }
    changestudent.save();
    
    res.json({ message: 'Successful' })
})


router.post('/deletetodo', async(req, res) => {
    let newTodo = req.body.newTodos
    let name = req.body.name;
    let newstudent = await studentscollection.findOne({ name: name }).exec()
    let newArray;
    newArray = newstudent.todos.filter((item) => {
        // console.log(item,' ',newTodo)
        return JSON.stringify(item) !== JSON.stringify(newTodo) // without stringify, the objects are not matching
    })
    newstudent.todos = newArray;
    newstudent.save();
    res.json({ message: 'Successful' })
})


router.get('/initial', async(req, res) => {
    const  {authorization}=  req.headers;
    const [,username] = authorization.split(' ')
    // console.log(username ,' from initial') 

    let todolist = await studentscollection.findOne({name:username}).exec()
    // console.log(todolist.todos);

    if(!todolist){
        res.status(403)
        res.json({
            message:'Invalid access'
        })

        return;
    }
    res.json(todolist.todos)
})




module.exports = router