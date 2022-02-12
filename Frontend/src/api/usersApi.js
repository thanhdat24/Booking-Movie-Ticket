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
  getUsersList: () => {
    const path = "/v1/users";
    return axiosClient.get(path);
  },
  deleteUser: (_id) => {
    const path = `/v1/users/${_id}`;
    return axiosClient.delete(path);
  },
  updateCurrentUser: (currentUser) => {
    const path = `/v1/users/updateMe`;
    return axiosClient.patch(path, currentUser);
  },
  getCurrentUser: () => {
    const path = `/v1/users/getMe`;
    return axiosClient.get(path);
  },
  changePassword: (currentUser) => {
    const path = `/v1/users/updateMyPassword`;
    return axiosClient.patch(path, currentUser);
  },
  getDetailUser: (_id) => {
    const path = `/v1/users/${_id}`;
    return axiosClient.get(path);
  },

  updateUser: (user,_id) => {
    const path = `/v1/users/${_id}`;
    return axiosClient.patch(path,user);
  },
};

export default usersApi;
