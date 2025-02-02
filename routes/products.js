import { Router } from "express";
import Products from "../models/Products.js";
import productMiddelware from "../middleware/product.js";
const router = Router();

router.get("/", async (req, res) => {
  const products = await Products.find().lean()
  res.render("index", {
    title: "Boom shop | Sammi",
    products,
    userId: req.userId
  });
});

router.get("/products", async (req, res) => {
  const myProducts = await Products.find({ user: req.userId }).populate('user').lean()

  res.render("products", {
    title: "Products | sammi",
    isProducts: true,
    myProducts
  });
});

router.get("/add", productMiddelware, (req, res) => {
  res.render("add", {
    title: "Add product | Sammi",
    isAdd: true,
    addError: req.flash("addError")
  });
});

router.post("/add-product", async (req, res) => {
  const { title, description, image, price } = req.body
  if (!title || !description || !image || !price) {
    req.flash("addError", 'All input in required')
    res.redirect("/add")
    return
  }
  await Products.create({ ...req.body, user: req.userId })

  res.redirect("/")
})

export default router;
