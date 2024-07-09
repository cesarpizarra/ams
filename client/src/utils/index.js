export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const formatTime = (timeString, isTimeIn) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Check if it's time in or time out based on the availability of timeString
  if (!timeString && isTimeIn) {
    return "No Time Out";
  } else if (!timeString && !isTimeIn) {
    return "No Time In";
  }

  // If timeString is available, format and return the time
  return new Date(timeString).toLocaleTimeString("en-US", options);
};
