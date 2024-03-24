const app = require("./app");
const connectDB = require("./database/database");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is working on http://localhost:${PORT}`);
});
