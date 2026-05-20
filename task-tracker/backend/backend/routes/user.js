const express = require("express");

const router = express.Router();

const User = require("../models/user");


// GET USERS
router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});


// DELETE USER
router.delete("/:id", async (req, res) => {

  try {

    const deletedUser =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!deletedUser) {

      return res.status(404).json({
        msg: "User not found"
      });

    }

    res.json({
      msg: "User deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});

module.exports = router;