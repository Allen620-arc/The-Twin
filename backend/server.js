const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'frontend' folder
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// In-memory array to store blog posts
let blogPosts = [
  {
    title: 'First Blog Post',
    content: 'This is the content of the first blog post',
    publishedDate: '2023-05-22',
    author: 'John Doe'
  },
  {
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post',
    publishedDate: '2023-05-23',
    author: 'Jane Smith'
  }
];

app.post('/api/posts', (req, res) => {
  // Retrieve the blog post data from the request body
  const { title, content, author } = req.body;

  // Create a new post object
  const newPost = {
    title,
    content,
    publishedDate: new Date().toISOString(), // Use the current date and time
    author
  };

  // Store the new post in the blogPosts array
  blogPosts.push(newPost);

  // Send a response indicating success or failure
  res.status(201).json({ message: 'Blog post created successfully' });
});

app.get('/api/posts', (req, res) => {
  // Send the blog posts as a JSON response
  res.json(blogPosts);
});

app.listen(5000);