import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

// Routes
import AuthRouter from "./routes/auth.js";
import ProductRouter from "./routes/products.js";

dotenv.config();
const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    secret: "keycat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(flash());

app.use(AuthRouter);
app.use(ProductRouter);

const PORT = process.env.PORT || 4100;

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Connected to MongoDB");
    });
    app.listen(PORT, () => console.log("Server is runing on port:", PORT));
  } catch (error) {
    console.log(error);
  }
};
startApp();
