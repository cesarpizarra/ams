export const getCurrentPhilippineTime = () => {
  const now = new Date();
  const options = { timeZone: "Asia/Manila", hour12: false };
  const philippineTime = now.toLocaleString("en-US", options);
  return philippineTime;
};
