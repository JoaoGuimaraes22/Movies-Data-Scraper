const express = require("express");
const app = express();

// Middleware
app.use("/api/test", require("./routes/api/test"));

// App listens
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
