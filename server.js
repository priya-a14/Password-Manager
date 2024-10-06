const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yaari786',
    database: 'password_manager'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API route to retrieve passwords
app.get('/api/passwords', (req, res) => {
    const query = 'SELECT * FROM passwords';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching passwords:', err);
            return res.status(500).json({ error: 'Server error', details: 'Failed to retrieve passwords from the database' });
        }

        res.status(200).json({ message: 'Passwords fetched successfully', data: results });
    });
});

// API route to add a new password entry
app.post('/api/passwords', (req, res) => {
    const { site, username, password } = req.body;
    if (!site || !username || !password) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const query = 'INSERT INTO passwords (site, username, password) VALUES (?, ?, ?)';
    db.query(query, [site, username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json({ id: result.insertId, site, username, password });
    });
});

// Delete a password
app.delete('/api/passwords/:id', (req, res) => {
    const id = parseInt(req.params.id); // Ensure ID is an integer
    const query = 'DELETE FROM passwords WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting password:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Password not found' });
        }
        res.json({ message: 'Password deleted successfully' });
    });
});

// Update a password
app.put('/api/passwords/:id', (req, res) => {
    const id = parseInt(req.params.id); // Ensure ID is an integer
    const { site, username, password } = req.body;
    const query = 'UPDATE passwords SET site = ?, username = ?, password = ? WHERE id = ?';
    db.query(query, [site, username, password, id], (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Password not found' });
        }
        res.json({ message: 'Password updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
