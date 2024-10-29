const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to allow cross-origin requests and JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb+srv://kritim186:Kriti123@cluster1.3d5u7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema and Model for Students
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  email: String,
});

const Student = mongoose.model('Student', studentSchema);

// Get all students
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a new student
app.post('/api/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// Update a student
app.put('/api/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Student updated' });
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});