import axiosClient from "./axiosClient";

const reviewApi = {
  getAllReview: () => {
    const path = "/v1/reviews";
    return axiosClient.get(path);
  },

  postReview: (newPost) => {
    const path = "/v1/reviews";
    return axiosClient.post(path, newPost);
  },
};

export default reviewApi;
