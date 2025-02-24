const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Correct MongoDB Connection String
mongoose.connect('mongodb://127.0.0.1:27017/collegeLibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
})
.then(() => console.log("Connected to MongoDB ✅"))
.catch(err => console.error("MongoDB Connection Error ❌", err));

// Define Schema and Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});

const Book = mongoose.model("Book", bookSchema);

// ✅ Get all books API
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ✅ Add a new book API
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ message: "Book added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ✅ Delete a book API
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
