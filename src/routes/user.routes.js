import { Router } from "express";
import { textToText } from "../controllers/textToText.controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.route("/use").post(textToText)

export default router;