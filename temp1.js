const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (replace with your actual connection string)
mongoose.connect('mongodb+srv://kritim186:Kriti123@cluster1.3d5u7.mongodb.net/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));

// Define the Student schema
const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Ensure id is unique
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

// Route to get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new student
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent); // Use 201 for created
  } catch (error) {
    res.status(400).json({ message: error.message }); // Use 400 for bad requests
  }
});

// Route to update a student by ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id }, // Use the custom id field
      req.body,
      { new: true, runValidators: true } // Return the updated document and run validation
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student updated', student: updatedStudent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a student by ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: req.params.id }); // Use the custom id field
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted', student: deletedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});