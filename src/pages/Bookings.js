import { useEffect, useState } from "react";
import BookingService from "../services/BookingService";

function Bookings() {
  const token = localStorage.getItem("token");
  const userRole = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchBookings = userRole === "ADMIN" 
      ? BookingService.allBookings 
      : BookingService.myBookings;

    fetchBookings()
      .then(res => setBookings(res.data))
      .catch(() => setError("Failed to load bookings"));
  }, [token, userRole]);

  // Student cancel
  const handleCancel = (id) => {
    BookingService.cancel(id)
      .then(() => setBookings(bookings.filter(b => b.id !== id)))
      .catch(err => alert(err.response?.data || "Cancel failed"));
  };

  // Stockholm current time
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

  // Dynamic status
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
    <div style={{ padding: "20px" }}>
      <h2>{userRole === "ADMIN" ? "All Bookings (Admin)" : "My Bookings"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {bookings.map(b => {
          const status = getStatus(b);
          return (
            <li key={b.id} style={{ marginBottom: "12px" }}>
              <strong>{b.courseName} ({b.transmissionType})</strong> — {formatDate(b.bookingDate)} {formatTime(b.startTime)} to {formatTime(b.endTime)} — <strong>{status}</strong>

              {/* Student Cancel */}
              {status === "BOOKED" && userRole !== "ADMIN" && (
                <button onClick={() => handleCancel(b.id)} style={{ marginLeft: "10px" }}>
                  Cancel
                </button>
              )}

              {/* Admin Cancel */}
              {status === "BOOKED" && userRole === "ADMIN" && (
                <button
                  onClick={() => {
                    BookingService.adminCancel(b.id)
                      .then(() => setBookings(bookings.filter(x => x.id !== b.id)))
                      .catch(err => alert(err.response?.data || "Cancel failed"));
                  }}
                  style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                >
                  Cancel Booking
                </button>
              )}

              {/* Completed */}
              {status === "COMPLETED" && (
                <span style={{ marginLeft: "10px", color: "green" }}>Completed</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Bookings;
