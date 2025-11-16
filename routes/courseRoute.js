const express = require("express");
const router = express.Router();
const { createCourse ,getCourseById ,deleteCourse  ,enrollCourse ,getAvailableCourses ,updateTitle ,updateDuration,updateCost ,updateOffered ,addStudent ,removeStudent} = require("../controllers/courseController");

// POST /api/courses
router.get("/getcourse/:id", getCourseById);
router.post("/enroll/:course_id/:student_id", enrollCourse);

router.post("/:instructor_id", createCourse);
router.delete("/deletecousre/:id", deleteCourse);
router.get("/available/:userId", getAvailableCourses);



router.patch("/:id/title/:value", updateTitle);
router.patch("/:id/duration/:value", updateDuration);
router.patch("/:id/cost/:value", updateCost);
router.patch("/:id/offered/:value", updateOffered);
// PATCH لإضافة طالب
router.patch("/:id/students/add/:studentId", addStudent);

// PATCH لإزالة طالب
router.patch("/:id/students/remove/:studentId", removeStudent);


module.exports = router;
