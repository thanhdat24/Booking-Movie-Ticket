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
  addMovieUploadImg: (movie) => {
    const path = `/v1/movies`;
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post(path, formData);
  },
};

export default moviesApi;
