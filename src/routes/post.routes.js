const { Router } = require("express");
const {
  GET_ALL_POSTS,
  GET_ONE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} = require("../controllers/post.controller");

const router = Router();

// Barcha postlar
router.get("/", GET_ALL_POSTS);

// ID orqali bitta post
router.get("/:id", GET_ONE_POST);

// Yangi post qo‘shish
router.post("/", CREATE_POST);

// Postni yangilash
router.put("/:id", UPDATE_POST);

// Postni o‘chirish
router.delete("/:id", DELETE_POST);

module.exports = router;
