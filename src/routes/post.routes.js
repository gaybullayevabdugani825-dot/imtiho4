const { Router } = require("express");
const {
  GET_ALL_POSTS,
  GET_ONE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} = require("../controllers/post.controller");

const router = Router();


router.get("/", GET_ALL_POSTS);


router.get("/:id", GET_ONE_POST);


router.post("/", CREATE_POST);

router.put("/:id", UPDATE_POST);


router.delete("/:id", DELETE_POST);

module.exports = router;
