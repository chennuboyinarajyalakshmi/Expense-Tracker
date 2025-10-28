export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null;

  try {
    const parsed = JSON.parse(userInfo);
    return parsed; // ✅ return full user data
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};
