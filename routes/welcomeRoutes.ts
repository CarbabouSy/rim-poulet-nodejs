import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my app");
});
export default router;
