const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
import "dotenv/config"

const JWT_SECRET = 'random#secret'; // Use an environment variable in a real app

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'student_management',
  password: 'password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all records for Monday (protected)
app.get('/api/monday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM monday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Monday (protected)
app.post('/api/monday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO monday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Monday (protected)
app.put('/api/monday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE monday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Monday (protected)
app.delete('/api/monday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM monday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
/////////////////////////////////////////////////////////////TUESDAY////////////////////////////////////////////
// Get all records for Tuesday (protected)
app.get('/api/tuesday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tuesday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Tuesday (protected)
app.post('/api/tuesday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tuesday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Tuesday (protected)
app.put('/api/tuesday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tuesday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Tuesday (protected)
app.delete('/api/tuesday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tuesday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*------------------------------------------------------WEDNESDAY------------------------------------------*/

// Get all records for Wednesday (protected)
app.get('/api/wednesday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wednesday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Wednesday (protected)
app.post('/api/wednesday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO wednesday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Wednesday (protected)
app.put('/api/wednesday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE wednesday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Wednesday (protected)
app.delete('/api/wednesday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM wednesday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*------------------------------------------------------THURSDAY-------------------------------------------*/
// Get all records for Thursday (protected)
app.get('/api/thursday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM thursday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Thursday (protected)
app.post('/api/thursday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO thursday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Thursday (protected)
app.put('/api/thursday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE thursday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Thursday (protected)
app.delete('/api/thursday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM thursday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*------------------------------------------------------FRIDAY---------------------------------------------*/
// Get all records for Friday (protected)
app.get('/api/friday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM friday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Friday (protected)
app.post('/api/friday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO friday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Friday (protected)
app.put('/api/friday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE friday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Friday (protected)
app.delete('/api/friday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM friday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*------------------------------------------------------SATURDAY-------------------------------------------*/
// Get all records for Saturday (protected)
app.get('/api/saturday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM saturday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Saturday (protected)
app.post('/api/saturday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO saturday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Saturday (protected)
app.put('/api/saturday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE saturday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Saturday (protected)
app.delete('/api/saturday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM saturday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*------------------------------------------------------SUNDAY-------------------------------------------*/
// Get all records for Sunday (protected)
app.get('/api/sunday', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sunday');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new record for Sunday (protected)
app.post('/api/sunday', authenticateToken, async (req, res) => {
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO sunday (room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a record for Sunday (protected)
app.put('/api/sunday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood } = req.body;
  try {
    const result = await pool.query(
      `UPDATE sunday SET room_no = $1, student_name = $2, attendance = $3, meal_preference = $4, phone_number = $5, residence = $6, desiredfood = $7 WHERE id = $8 RETURNING *`,
      [room_no, student_name, attendance, meal_preference, phone_number, residence, desiredfood, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a record for Sunday (protected)
app.delete('/api/sunday/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sunday WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PostgreSQL table setup
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, countryCode, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, country_code, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, countryCode, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
