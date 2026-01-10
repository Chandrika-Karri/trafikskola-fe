import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CourseService from "../services/CourseService";
import CourseForm from "../components/CourseForm";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const navigate = useNavigate();

  // Get user role
  const token = localStorage.getItem("token");
  const userRole = token ? jwtDecode(token).role : null;
  const isAdmin = userRole === "ADMIN";

  // Load all courses
  useEffect(() => {
    CourseService.getAll()
      .then(res => setCourses(res.data))
      .catch(err => setError(err.response?.data || "Error loading courses"));
  }, []);

  // Open modal to add a new course
  const handleAddCourseClick = () => {
    setEditCourse(null);
    setShowForm(true);
  };

  // Open modal to edit existing course
  const handleEditCourseClick = (course) => {
    setEditCourse(course);
    setShowForm(true);
  };

  // Save handler for CourseForm
  const handleSave = (course) => {
    if (course.id) {
      // Update existing course
      CourseService.update(course.id, course)
        .then(res => {
          setCourses(courses.map(c => c.id === course.id ? res.data : c));
          setShowForm(false);
        })
        .catch(err => alert(err.response?.data || "Failed to update course"));
    } else {
      // Add new course
      CourseService.create(course)
        .then(res => {
          setCourses([...courses, res.data]);
          setShowForm(false);
        })
        .catch(err => alert(err.response?.data || "Failed to add course"));
    }
  };

  // Delete a course
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    CourseService.delete(id)
      .then(() => setCourses(courses.filter(c => c.id !== id)))
      .catch(err => alert(err.response?.data || "Failed to delete course"));
  };

  // Student clicks "Book" → go to booking page
  const handleBook = (courseId) => {
    navigate(`/courses/${courseId}/slots`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Admin: Add Course button */}
      {isAdmin && (
        <button onClick={handleAddCourseClick} style={{ marginBottom: "15px" }}>
          Add Course
        </button>
      )}

      {/* CourseForm modal */}
      {showForm && (
        <CourseForm
          course={editCourse}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul>
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: "10px" }}>
            {course.name} — ${course.price} — {course.duration} hrs

            {/* Student: Book slot */}
            {!isAdmin && (
              <button
                onClick={() => handleBook(course.id)}
                style={{ marginLeft: "10px" }}
              >
                View Slots
              </button>
            )}

            {/* Admin: Edit/Delete */}
            {isAdmin && (
              <>
                <button
                  onClick={() => handleEditCourseClick(course)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
