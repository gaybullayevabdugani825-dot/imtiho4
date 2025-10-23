const path = require("path");
const { globalError, ClientError } = require("shokhijakhon-error-handler");
const myReadFile = require("../utils/myReadFile");
const myWriteFile = require("../utils/myWriteFile");

module.exports = {
  async REGISTER(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password)
        throw new ClientError("All fields are required", 400);

      const users = await myReadFile("users.json");
      const check = users.find(
        (u) => u.email === email || u.username === username
      );
      if (check) throw new ClientError("User already exists", 400);

      const newUser = {
        id: users.length ? users.at(-1).id + 1 : 1,
        username,
        email,
        password,
      };

      users.push(newUser);
      await myWriteFile("users.json", users);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      globalError(err, res);
    }
  },

  async LOGIN(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new ClientError("Email and password required", 400);

      const users = await myReadFile("users.json");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) throw new ClientError("Invalid credentials", 401);

      res.json({
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (err) {
      globalError(err, res);
    }
  },
};
