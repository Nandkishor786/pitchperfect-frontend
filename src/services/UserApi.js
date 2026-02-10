import api from "./api";

export const getUsersCount = async () => {
  const res = await api.get("/users/count");
  return res.data.count;
};
