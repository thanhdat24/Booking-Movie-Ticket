import axiosClient from "./axiosClient";

const discountsApi = {
  getDiscountsList: () => {
    const path = "/v1/discounts";
    return axiosClient.get(path);
  },
  getDetailDiscount: (_id) => {
    const path = `/v1/discounts/${_id}`;
    return axiosClient.get(path);
  },
  updateActiveDiscount: (active, _id) => {
    const path = `/v1/discounts/${_id}`;
    return axiosClient.patch(path, active);
  },
};

export default discountsApi;
