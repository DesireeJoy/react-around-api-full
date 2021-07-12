const router = require("express").Router(); 
const { celebrate, Joi } = require("celebrate"); 
const { auth } = require("../middleware/auth"); 
const validator = require("validator"); 
 
function validateUrl(string) { 
  return validator.isURL(string); 
} 
 
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
  // createUser, 
  updateAvatar, 
  updateUser, 
} = require("../controllers/userController"); 
 
router.get("/", getUsers); 
// router.post("/", createUser); 
router.get( 
  "/:userId", 
  auth, 
  celebrate({ 
    params: Joi.object().keys({ 
      userId: Joi.string().hex().length(24).required(), 
    }), 
  }), 
  getOneUser 
); 
 
router.get("/me, getCurrentUser"); 
router.patch( 
  "/me/avatar", 
  auth, 
  celebrate({ 
    body: Joi.object().keys({ 
      avatar: Joi.string().custom(validateUrl).required().min(2).max(30), 
    }), 
  }), 
  updateAvatar 
); 
router.patch( 
  "/me", 
  auth, 
  celebrate({ 
    body: Joi.object().keys({ 
      name: Joi.string().required().min(2).hex().max(30), 
      about: Joi.string().custom(validateUrl).required().min(2).max(30), 
    }), 
  }), 
  updateUser 
); 
 
module.exports = router; 