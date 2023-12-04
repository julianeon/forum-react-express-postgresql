const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000' // or use '*' to allow all origins
}));

// ... rest of your Express app setup


app.use(express.json());

// Get all forum titles and comments
app.get('/forums', async (req, res) => {
  try {
    const allForums = await pool.query("SELECT * FROM forums");
    res.json(allForums.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Post a new forum title and comment
app.post('/forums', async (req, res) => {
  try {
    const { title, comment } = req.body;
    const newForum = await pool.query(
      "INSERT INTO forums (title, comment) VALUES ($1, $2) RETURNING *",
      [title, comment]
    );
    res.json(newForum.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
