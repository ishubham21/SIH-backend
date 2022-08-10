import { Router } from "express";
import createHttpError from "http-errors";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello world!");
});
