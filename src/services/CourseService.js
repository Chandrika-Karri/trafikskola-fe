import axiosInstance from "../api/axiosInstance";

const CourseService = {
  getAll: () => axiosInstance.get("/courses"),
  create: (course) => axiosInstance.post("/courses", course),
  update: (id, course) => axiosInstance.put(`/courses/${id}`, course),
  delete: (id) => axiosInstance.delete(`/courses/${id}`),
};

export default CourseService;
