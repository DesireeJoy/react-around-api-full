const router = require("express").Router();

// const path = require("path");
// const fs = require("fs").promises;

// const dataPath = path.join(__dirname, "../data/users.json");
// joining the path segments to create an absolute path

// router.get("/", (req, res) => {
//   fs.readFile(dataPath, { encoding: "utf8" })
//     .then((data) => {
//       res.status(200).send(JSON.parse(data));
//     })
//     .catch(() => {
//       res.status(500).send({ message: "File not found" });
//     });
// });

// router.get("/:id", (req, res) => {
//   fs.readFile(dataPath, { encoding: "utf8" })
//     .then((data) => {
//       const newData = JSON.parse(data);
//       const selectedUser = newData.find((user) => user._id === req.params.id);
//       if (!selectedUser) {
//         res.status(404).send({ message: "User ID not found" });
//       } else {
//         res.send({ selectedUser });
//       }
//     })
//     .catch((err) => {
//       res.statut(500).send({ message: "File not found" });
//     });
// });

// module.exports = router;
const {
  getOneUser,
  getUsers,
  createUser,
  updateAvatar,
  updateUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getOneUser);
router.patch("/me/avatar", updateAvatar);
router.patch("/me", updateUser);

module.exports = router;
