import axiosInstance from "../api/axiosInstance";

const BookingService = {
  // STUDENT: Get current user's bookings
  myBookings: () => axiosInstance.get("/bookings/my"),

  // STUDENT: Book a course slot
  book: (slotId) => axiosInstance.post(`/slots/book/${slotId}`),

  // STUDENT: Cancel a booking
  cancel: (bookingId) => axiosInstance.delete(`/bookings/${bookingId}`),

  // ADMIN: Get all bookings
  allBookings: () => axiosInstance.get("/admin/bookings"),

  // ADMIN: Cancel any booking
  adminCancel: (bookingId) => axiosInstance.delete(`/admin/bookings/${bookingId}`),

  // ADMIN: Update booking status
  updateStatus: (bookingId, status) =>
    axiosInstance.put(`/admin/bookings/${bookingId}/status`, null,{ 
      params: { status } })
};

export default BookingService;
