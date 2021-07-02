const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");
// middleware

app.use(cors());
app.use(express.json());
// Routes
// Create a note
app.post("/notes", async (req, res) => {
  try {
    const { title, password_name } = req.body;
    const newNote = await pool.query(
      "INSERT INTO note (password_name, title) VALUES($1,$2) RETURNING *",
      [title, description]
    );
    res.json(newNote.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// Get All Notes
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM note");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// Get a note
app.get("/notes/:password_id", async (req, res) => {
  try {
    const { password_id } = req.params;
    const getNote = await pool.query(
      "SELECT * FROM note WHERE password_id = $3",
      [password_id]
    );
    res.json(getNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a password
app.put("/notes/:password_id", async (req, res) => {
  try {
    const { password_id } = req.params;
    const { title, password_name } = req.body;
    const updatePass = await pool.query(
      "UPDATE note SET (description,title) = ($1,$2) WHERE docs_id = $3",
      [password_name, title, password_id]
    );

    res.json("Password Updated");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a password
app.delete("/notes/:id", async (req, res) => {
  try {
    const { password_id } = req.params;
    const deletePass = await pool.query(
      "DELETE FROM note WHERE password_id = $1",
      [paswword_id]
    );
    res.json("Password was Deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3001, () => {
  console.log("Started on 3001");
});
