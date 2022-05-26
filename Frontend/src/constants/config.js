import { nanoid } from "nanoid";
export const BASE_URL = "http://127.0.0.1:8080/api";
export const TOKEN = "token";
export const USER_LOGIN = "user_login";

const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const avtIdUser = currentUser ? currentUser?.avtIdUser : nanoid(10);
export { avtIdUser };
export const FAKE_AVATAR = `https://i.pravatar.cc/300?u=${avtIdUser}`;

