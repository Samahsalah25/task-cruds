const Course = require("../models/Course");



exports.createCourse = async (req, res) => {
  try {
    const { title, duration, cost } = req.body;
    const instructorId = req.params.instructor_id; // من الـ URL

    const newCourse = new Course({
      title,
      duration,
      cost,
      instructorId: [instructorId], // ← هنا استخدمناه من الـ URL
      students: [] // فاضية في البداية
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      course: newCourse
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId)
      .populate("instructorId", "name email role")  // Optional: عشان تجيب بيانات المعلمين
      .populate("students", "name email role");    // Optional: عشان تجيب بيانات الطلاب

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      course
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const { course_id, student_id } = req.params;

    const course = await Course.findById(course_id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.students.includes(student_id))
      return res.status(400).json({ message: "Already enrolled" });

    course.students.push(student_id);
    await course.save();

    res.json({
      success: true,
      message: "Enrolled successfully",
      course
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
      course
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAvailableCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    // جلب الكورسات المفتوحة واللي المستخدم مش مسجل فيها
    const availableCourses = await Course.find({
      offered: true,          
      students: { $ne: userId } 
    })
    .populate("instructorId", "name email role") // بيانات الانستراكتورز
    .populate("students", "name email role");   

    res.json({
      success: true,
      courses: availableCourses
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




/// el update 


// تحديث العنوان
exports.updateTitle = async (req, res) => {
  try {
    const { id, value } = req.params; // id = courseId, value = new title

    const course = await Course.findByIdAndUpdate(
      id,
      { title: value },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تحديث المدة
exports.updateDuration = async (req, res) => {
  try {
    const { id, value } = req.params; // value = new duration
    const course = await Course.findByIdAndUpdate(
      id,
      { duration: Number(value) },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تحديث التكلفة
exports.updateCost = async (req, res) => {
  try {
    const { id, value } = req.params; // value = new cost
    const course = await Course.findByIdAndUpdate(
      id,
      { cost: Number(value) },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تحديث حالة الـ offered
exports.updateOffered = async (req, res) => {
  try {
    const { id, value } = req.params; // value = "true" or "false"
    const course = await Course.findByIdAndUpdate(
      id,
      { offered: value === "true" },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addStudent = async (req, res) => {
  try {
    const { id, studentId } = req.params; 
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.students.includes(studentId))
      return res.status(400).json({ message: "Student already enrolled" });

    course.students.push(studentId);
    await course.save();

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeStudent = async (req, res) => {
  try {
    const { id, studentId } = req.params; 
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.students = course.students.filter(s => s.toString() !== studentId);
    await course.save();

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructorId", "name email role")
      .populate("students", "name email role");

    res.json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

