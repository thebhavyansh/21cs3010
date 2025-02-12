const pool = require("../config/db");

exports.bookSeat = async (req, res) => {
  const { train_id } = req.body;
  const user_id = req.user.id;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const seatData = await client.query(
      "SELECT seats_available FROM trains WHERE id = $1 FOR UPDATE",
      [train_id]
    );

    if (!seatData.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Train not found" });
    }

    const seatsLeft = seatData.rows[0].seats_available;
    if (seatsLeft > 0) {
      await client.query(
        "UPDATE trains SET seats_available = seats_available - 1 WHERE id = $1",
        [train_id]
      );

      const newBooking = await client.query(
        "INSERT INTO bookings (user_id, train_id) VALUES ($1, $2) RETURNING *",
        [user_id, train_id]
      );

      await client.query("COMMIT");
      return res.status(201).json(newBooking.rows[0]);
    } else {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "No available seats" });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: "Booking process failed. Try again." });
  } finally {
    client.release();
  }
};
