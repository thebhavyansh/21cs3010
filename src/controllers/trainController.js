const pool = require("../config/db");

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    await pool.query(
      "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4)",
      [name, source, destination, totalSeats]
    );
    res.status(201).json({ message: "Train added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableTrains = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM trains WHERE source = $1 AND destination = $2",
      [source, destination]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
