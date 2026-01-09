import api from "../services/api";

export const logActivity = async ({ type, targetType, targetId }) => {
  try {
    await api.post("/activities", {
      type,
      targetType,
      targetId,
    });
  } catch {
    // silent fail – card flow must not break
  }
};
