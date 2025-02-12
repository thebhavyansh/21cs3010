const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, encryptedPassword]);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!userQuery.rows.length) return res.status(401).json({ message: "Invalid email or password" });
    
    const user = userQuery.rows[0];
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return res.status(401).json({ message: "Invalid email or password" });
    
    const authToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token: authToken });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Try again later." });
  }
};