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
};

export default bookingApi;
