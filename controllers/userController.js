const User = require("../models/User");
const Course = require("../models/Course");

// GET user courses
exports.getAllUserCourses = async (req, res) => {
  try {
    const userId = req.params.id;

    // جلب الكورسات اللي المستخدم instructor فيها
    const instructorCourses = await Course.find({ instructorId: userId })
      .populate("instructorId", "name email role") // بيانات الانستراكتورز
      .populate("students", "name email role");   // بيانات الطلاب

    // جلب الكورسات اللي المستخدم trainee فيها
    const traineeCourses = await Course.find({ students: userId })
      .populate("instructorId", "name email role")
      .populate("students", "name email role");

    // دمج النتيجة وإزالة التكرارات لو فيه
    const allCoursesMap = new Map();

    [...instructorCourses, ...traineeCourses].forEach(course => {
      allCoursesMap.set(course._id.toString(), course);
    });

    const allCourses = Array.from(allCoursesMap.values());

    res.json({
      success: true,
      courses: allCourses
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};