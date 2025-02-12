const adminMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "Access Denied: Invalid API Key" });
  }
  next();
};

module.exports = adminMiddleware;
