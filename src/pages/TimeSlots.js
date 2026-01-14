import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeSlotService from "../services/TimeSlotService";

function TimeSlots() {
  const { courseId } = useParams(); // Get course ID from route
  const [date, setDate] = useState(""); // Selected date
  const [slots, setSlots] = useState([]); // Slots for that date
  const [loading, setLoading] = useState(false);
  const [transmission, setTransmission] = useState("AUTOMATIC"); 

  // Load slots whenever courseId or date changes
  useEffect(() => {
    if (!courseId || !date) return;

    setLoading(true);
    TimeSlotService.getSlots(courseId, date)
      .then(res => setSlots(res.data))
      .catch(err => alert(err.response?.data || "Failed to load slots"))
      .finally(() => setLoading(false));
  }, [courseId, date]);

  // Book a slot
  const handleBook = (slotId, booked) => {
  if (booked) return; // Already booked

  TimeSlotService.bookSlot(slotId, transmission)
    .then(res => {
      const booking = res.data; // BookingDTO
      alert(`Booked ${booking.courseName} on ${booking.date} at ${booking.startTime} with ${booking.transmissionType} transmission`);
      // Update slots array to mark this slot as booked
      setSlots(prev =>
        prev.map(s => s.id === slotId ? { ...s, booked: true } : s)
      );
    })
    .catch(err => alert(err.response?.data || "Booking failed"));
};


  return (
    <div className="container">
      <h2>Available Time Slots</h2>

      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px" }}
      />

      {loading && <p>Loading slots...</p>}

      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
        style={{ marginBottom: "15px" }}
      >
        <option value="AUTOMATIC">Automatic</option>
        <option value="MANUAL">Manual</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {slots.length === 0 && date && !loading && <p>No slots available.</p>}

        {slots.map(slot => (
          <div
            key={slot.id}
            onClick={() => handleBook(slot.id, slot.booked)}
            style={{
              padding: "15px",
              margin: "10px",
              width: "140px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: slot.booked ? "not-allowed" : "pointer",
              backgroundColor: slot.booked ? "#ff4d4d" : "#4caf50",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {slot.startTime} - {slot.endTime}
            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              {slot.booked ? "Booked" : "Available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlots;
