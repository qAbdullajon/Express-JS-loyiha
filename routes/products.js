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

router.get("/product/:id", async (req, res) => {
  const { id } = req.params
  const product = await Products.findById(id).populate('user').lean()
  res.render('product', {
    title: 'Product detail | Sammi',
    product
  })
})

router.get("/edit-product/:id", async (req, res) => {
  const { id } = req.params
  const product = await Products.findById(id).populate('user').lean()
  res.render('edit-product', {
    title: 'Edit product | Sammi',
    product,
    editProductError: req.flash('editProductError')
  })
})

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

router.post("/edit-product/:id", async (req, res) => {
  const { id } = req.params
  const { title, description, image, price } = req.body

  if (!title || !description || !image || !price) {
    req.flash("editProductError", 'All input in required')
    res.redirect(`/edit-product/${id}`)
    return
  }

  const updateData = await Products.findByIdAndUpdate(id, req.body, { new: true })
  res.redirect("/")
  return
})

router.post("/delete-product/:id", async (req, res) => {
  const { id } = req.params

  await Products.findByIdAndDelete(id)
  res.redirect("/")
  return
})

export default router;
