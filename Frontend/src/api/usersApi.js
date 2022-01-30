import axiosClient from "./axiosClient";

const usersApi = {
  postLogin: (user) => {
    const path = "/v1/users/login";
    return axiosClient.post(path, user);
  },
  postRegister: (user) => {
    const path = "/v1/users/signup";
    return axiosClient.post(path, user);
  },
};

export default usersApi;
