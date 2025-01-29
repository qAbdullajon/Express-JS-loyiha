import express from "express";
import AuthRouter from "./routes/auth.js";
import ProductRouter from "./routes/products.js";
import { create } from "express-handlebars";

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

app.use(AuthRouter);
app.use(ProductRouter);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log("Server is runing on port:", PORT));
