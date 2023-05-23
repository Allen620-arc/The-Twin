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

// In-memory array to store registered users
let registeredUsers = [];

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

app.post('/api/login', (req, res) => {
  // Retrieve the username and password from the request body
  const { username, password } = req.body;

  // Check if the username and password match a registered user
  const user = registeredUsers.find((user) => user.username === username && user.password === password);

  if (user) {
    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.post('/api/register', (req, res) => {
  // Retrieve the username and password from the request body
  const { username, password } = req.body;

  // Check if the username already exists in the registered users array
  const userExists = registeredUsers.some((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create a new user object
  const newUser = {
    username,
    password
  };

  // Store the new user in the registeredUsers array
  registeredUsers.push(newUser);

  // Send a response indicating success
  res.status(201).json({ message: 'User registered successfully' });
});

app.get('/api/register', (req, res) => {
    // Send the blog posts as a JSON response
    res.json(registeredUsers);
});

app.listen(5000);