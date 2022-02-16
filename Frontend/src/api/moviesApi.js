import axiosClient from "./axiosClient";

const moviesApi = {
  getMoviesList: () => {
    const path = "/v1/movies";
    return axiosClient.get(path);
  },
  deleteMovie: (_id) => {
    const path = `/v1/movies/${_id}`;
    return axiosClient.delete(path);
  },
  updateMovie: (_id) => {
    const path = `/v1/movies/${_id}`;
    return axiosClient.patch(path);
  },
};

export default moviesApi;
