const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./utils/ErrorHandler");
const userRoutes = require("./routes/userRoute");
const quizRoutes = require("./routes/quizRoute");
const path = require('path')
const cors = require("cors");
const app = express();


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,process.env.FRONTEND_URL_2],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is working fine",
  });
});

app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/quiz", quizRoutes);

app.use(errorMiddleware);
module.exports = app;
