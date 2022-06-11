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
  likeComment: (id, newPost) => {
    const path = `/v1/reviews/${id}`;
    return axiosClient.patch(path, newPost);
  },
};

export default reviewApi;
