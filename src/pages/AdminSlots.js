import { useEffect, useState } from "react";
import CourseService from "../services/CourseService";
import TimeSlotService from "../services/TimeSlotService";

function AdminSlots() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    CourseService.getAll()
      .then(res => setCourses(res.data))
      .catch(() => alert("Error loading courses"));
  }, []);

  useEffect(() => {
    if (courseId && date) {
      loadSlots();
    }
  }, [courseId, date]);


  const loadSlots = () => {
    if (!courseId || !date) return;

    TimeSlotService.getSlots(courseId, date)
      .then(res => setSlots(res.data))
      .catch(() => alert("Error loading slots"));
  };

  const createSlot = () => {
    if (!courseId || !date || !startTime || !endTime) {
      return alert("All fields are required");
    }

    

    TimeSlotService.createSlot({
      course: { id: courseId },
      date: date,
      startTime: startTime,
      endTime: endTime
    })
      .then(() => {
        alert("Slot created");
        loadSlots();
      })
      .catch(err =>
        alert(err.response?.data || "Failed to create slot")
      );
  };

  return (
    <div>
      <h2>Admin – Create Time Slots</h2>

      {/* Course */}
      <select value={courseId} onChange={e => setCourseId(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={e => setDate(e.target.value)}
      />

      {/* Time */}
      <input
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
      />

      <input
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
      />

      <button onClick={createSlot}>Create Slot</button>

      <hr />

      <h3>Existing Slots</h3>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {slots.map(s => (
          <div
            key={s.id}
            style={{
              padding: "10px",
              margin: "8px",
              borderRadius: "6px",
              backgroundColor: s.booked ? "#ff4d4d" : "#4caf50",
              color: "white"
            }}
          >
            {s.startTime} - {s.endTime} - {s.date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSlots;
