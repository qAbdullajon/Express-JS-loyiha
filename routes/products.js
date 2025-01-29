import { Router } from "express";
const router = Router();

router.get("/", (rea, res) => {
  res.render("index", {
    title: "Boom shop | Sammi",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | sammi",
    isProducts: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add product | Sammi",
    isAdd: true,
  });
});

export default router;
