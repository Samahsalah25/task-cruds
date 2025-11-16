const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true }, // بالأسابيع
  instructorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],    
  cost: { type: Number, default: 0 },
  offered: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);


// login admin => login => create user ( name-email-password- role -password ,courses)
// create courses => title - duration - offerd- instructorId - students 
//  login ( instructor or student )
// 
// if student log in
// (get all courses he enrolled) + can enroll here 
// show all courses he didm't enrol and can enrolled
// update here data 
//g
// {
//   "id" :"" ,
//   "title":"" ,
//   "cost":"" ,
//   "instructorId":"ee",
//   "duration":"ee",
//   "students":[{"id":"" ,"name":"} ,{"id":"" ,"name":"}]
// }
// patch ,put =?
// get => submit:    
