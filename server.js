const express = require("express");
const app = express();

// Middleware
app.use("/api/movies", require("./routes/api/movies"));
app.use("/api/upmovies", require("./routes/api/upmovies"));

// App listens
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
