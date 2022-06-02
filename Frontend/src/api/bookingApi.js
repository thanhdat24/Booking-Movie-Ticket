import axiosClient from "./axiosClient";
const bookingApi = {
  postCreateShowTimes: (data) => {
    const path = `/v1/showtimes`;
    return axiosClient.post(path, data);
  },
  deleteShowTimes: (_id) => {
    const path = `/v1/showtimes/${_id}`;
    return axiosClient.delete(path);
  },
  getDetailShowtimes: (_id) => {
    const path = `/v1/showtimes/${_id}`;
    return axiosClient.get(path);
  },
  updateShowtimes: (_id, showtime) => {
    const path = `/v1/showtimes/${_id}`;
    return axiosClient.patch(path, showtime);
  },
  getDanhSachPhongVe: (_id) => {
    const path = `/v1/showtimes/${_id}`;
    return axiosClient.get(path);
  },
  postCreateTicket: (data) => {
    const path = `/v1/tickets`;
    return axiosClient.post(path, data);
  },
};

export default bookingApi;
