import axiosInstance from "../api/axiosInstance";

const TimeSlotService = {
  // STUDENT
  getSlots: (courseId, date) =>
    axiosInstance.get("/slots", {
      params: { courseId, date },
    }),

  bookSlot: (slotId, transmissionType) =>
    axiosInstance.post(`/slots/book/${slotId}`, { transmissionType }),

  // ADMIN
  createSlot: (data) =>
    axiosInstance.post("/admin/slots", data),
    
};

export default TimeSlotService;
