import axiosClient from "./axiosClient";

const theatersClusterApi = {
  getTheaterClusterList: () => {
    const path = "/v1/theatercluster";
    return axiosClient.get(path);
  },

  getDetailTheaterCluster: (_id) => {
    const path = `/v1/theatercluster/${_id}`;
    return axiosClient.get(path);
  },
};

export default theatersClusterApi;
