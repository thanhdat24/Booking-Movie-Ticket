import axiosClient from "./axiosClient";

const theatersApi = {
  getTheaterList: () => {
    const path = "/v1/theaters";
    return axiosClient.get(path);
  },
};

export default theatersApi;
