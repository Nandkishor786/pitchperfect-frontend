export const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;

    const user = JSON.parse(raw);

    if (!user?.role || !user?.id) return null;

    return user;
  } catch (err) {
    console.error("Invalid user in storage", err);
    return null;
  }
};

export const setUserToStorage = (user) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUserFromStorage = () => {
  localStorage.removeItem("user");
};

//logout
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
