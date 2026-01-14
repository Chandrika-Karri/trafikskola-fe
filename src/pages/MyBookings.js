import { useEffect, useState } from "react";
import BookingService from "../services/BookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingService.myBookings()
      .then(res => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, []);

  const cancelBooking = (id) => {
    BookingService.cancel(id)
      .then(() => setBookings(bookings.filter(b => b.id !== id)))
      .catch(err => alert(err.response?.data || "Cancel failed"));
  };

  const getStockholmNow = () => {
    const nowStr = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Stockholm",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date());
    return new Date(nowStr);
  };

  const getStatus = (b) => {
    if (b.status === "CANCELLED") return "CANCELLED";

    const [hours, minutes] = b.endTime.split(":").map(Number);
    const [year, month, day] = b.bookingDate.split("-").map(Number);

    const slotEnd = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const now = getStockholmNow();

    return slotEnd < now ? "COMPLETED" : "BOOKED";
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  const formatTime = (timeStr) => timeStr ? timeStr.substring(0, 5) : "";

  return (
    <div className="container">
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(b => {
          const status = getStatus(b);
          return (
            <li key={b.id} style={{ marginBottom: "12px" }}>
              <strong>{b.courseName} ({b.transmissionType})</strong> — {formatDate(b.bookingDate)} {formatTime(b.startTime)} to {formatTime(b.endTime)} — <strong>{status}</strong>
              
              {status === "BOOKED" && (
                <button onClick={() => cancelBooking(b.id)} style={{ marginLeft: "10px" }}>
                  Cancel
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyBookings;
