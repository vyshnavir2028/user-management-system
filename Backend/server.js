const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let userId = 1;

// Get all users
app.get('/api/users', (req, res) => res.json(users));

// Add a user
app.post('/api/users', (req, res) => {
    const user = { id: userId++, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index >= 0) {
        users[index] = { id, ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.status(204).send();
});

// Start the server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
