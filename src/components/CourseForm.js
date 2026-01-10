import { useEffect, useState } from "react";

function CourseForm({ course, onSave, onCancel }) {
  const [name, setName] = useState(course?.name || "");
  const [price, setPrice] = useState(course?.price || "");
  const [duration, setDuration] = useState(course?.duration || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) {
      return alert("All fields are required");
    }
    onSave({ id: course?.id, name, price, duration });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Course Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Duration (hours):</label>
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
    </form>
  );
}

export default CourseForm;
