export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null; // prevent JSON.parse(null) error

  try {
    const parsed = JSON.parse(userInfo);
    return parsed?.token || null; // safely return token if exists
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};
