const express = require("express");
const router = express.Router();
const {getAllUserCourses } = require("../controllers/userController");

// GET /api/users/:id/courses
router.get("/:id/courses", getAllUserCourses);

module.exports = router;
