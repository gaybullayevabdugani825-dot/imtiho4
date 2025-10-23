const { globalError, ClientError } = require("shokhijakhon-error-handler");
const myReadFile = require("../utils/myReadFile");
const myWriteFile = require("../utils/myWriteFile");

// GET all posts (with ?title=search optional)
exports.GET_ALL_POSTS = async (req, res) => {
  try {
    const { title } = req.query;
    let posts = await myReadFile("posts.json");

    if (title) {
      posts = posts.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    res.json(posts);
  } catch (err) {
    globalError(err, res);
  }
};

// GET one post
exports.GET_ONE_POST = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await myReadFile("posts.json");

    const post = posts.find((p) => p.id === Number(id));
    if (!post) throw new ClientError("Post not found", 404);

    res.json(post);
  } catch (err) {
    globalError(err, res);
  }
};

// CREATE new post
exports.CREATE_POST = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) throw new ClientError("Missing fields", 400);

    const posts = await myReadFile("posts.json");

    const newPost = {
      id: posts.length ? posts.at(-1).id + 1 : 1,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await myWriteFile("posts.json", posts);

    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    globalError(err, res);
  }
};

// UPDATE post
exports.UPDATE_POST = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const posts = await myReadFile("posts.json");

    const index = posts.findIndex((p) => p.id === Number(id));
    if (index === -1) throw new ClientError("Post not found", 404);

    posts[index] = { ...posts[index], title, content };
    await myWriteFile("posts.json", posts);

    res.json({ message: "Post updated successfully" });
  } catch (err) {
    globalError(err, res);
  }
};

//  DELETE post
exports.DELETE_POST = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await myReadFile("posts.json");

    const filtered = posts.filter((p) => p.id !== Number(id));
    await myWriteFile("posts.json", filtered);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    globalError(err, res);
  }
};
