import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = new express();

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // Other headers you may need to set
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

//routes import

//routes declaration
app.use("/api/v1/users", userRouter);

export default app;