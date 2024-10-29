const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// const corsOptions = {
//     origin: 'http://example.com', 
//     methods: 'GET,POST', 
//     allowedHeaders: 'Content-Type,Authorization'
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://RaunakSharma:PozqDxDkbYn0rcLm@cluster0.zmhsk06.mongodb.net/')
.then(console.log('Mongo db has connected successsfully'));

const StudentSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    email: String
});

const Student = mongoose.model('Student', StudentSchema);

app.get('/students', async (req, res) =>{
    const students = await Student.find();
    res.json(students);
});


app.post('/students', async (req, res)=>{
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
});

app.put('/students/:id', async (req, res)=>{
    await Student.findOneAndUpdate({id: req.params.id}, req.body);
    res.json({message: 'Student Updated'});
});

app.delete('/students/:id', async (req, res) =>{
    await Student.findOneAndDelete({id: req.params.id});
    res.json({message: 'Student Deleted'});
});

app.listen(5000, ()=>{
    console.log('Server Running on Port No. 5000');
});