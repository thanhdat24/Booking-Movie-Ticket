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
  checkPhoneExists: (phone) => {
    const path = `/v1/users/isExists?phoneNumber=${phone}`;
    return axiosClient.get(path);
  },
};

export default usersApi;
