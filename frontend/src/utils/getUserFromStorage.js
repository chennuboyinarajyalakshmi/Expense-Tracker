export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null;

  try {
    const parsed = JSON.parse(userInfo);
    return parsed; // ✅ return the whole user info, not just token
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};
