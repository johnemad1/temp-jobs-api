require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
//security
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss")
//extra Packages
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const notFound = require("./middleware/not-found");
const authenticateUser = require("./middleware/authentication.js");
//routers
const authRouter = require("./routes/auth.js");
const jobRouter = require("./routes/jobs.js");
// connect db
const connectDB = require("./DB/connect");

app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL, console.log("connected"));
    app.listen(port, console.log(`Starting server on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
