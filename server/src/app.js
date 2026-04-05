import express from "express";
import cors from "cors";
//import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT,
    ],
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.send("wordle.ap server");
});

//routes declaration
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export default app;
