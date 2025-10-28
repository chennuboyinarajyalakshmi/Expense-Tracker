// utils/getUserFromStorage.js
export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null;

  try {
    const parsed = JSON.parse(userInfo);
    return parsed?.token; // ✅ return only the token string, not the full object
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};
