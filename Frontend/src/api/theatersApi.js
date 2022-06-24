import axiosClient from "./axiosClient";

const theatersApi = {
  getTheaterList: () => {
    const path = "/v1/theaters";
    return axiosClient.get(path);
  },
  getAllShowTimes: () => {
    const path = "/v1/showtimes";
    return axiosClient.get(path);
  },
  postCreateTheaters: (data) => {
    const path = `/v1/theaters`;
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return axiosClient.post(path, formData);
  },
  deleteTheater: (_id) => {
    const path = `/v1/theaters/${_id}`;
    return axiosClient.delete(path);
  },

  getDetailTheater: (_id) => {
    const path = `/v1/theaters/${_id}`;
    return axiosClient.get(path);
  },

  updateTheater: (theater, _id) => {
    const path = `/v1/theaters/${_id}`;
    return axiosClient.patch(path, theater);
  },
};

export default theatersApi;
