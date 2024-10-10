const formatDate = (dateString) => {
  const now = new Date();
  const createdAt = new Date(dateString);
  const diffInSeconds = Math.floor((now - createdAt) / 1000); // Difference in seconds

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  // If the difference is more than 24 hours, format the date as "DD/MM/YYYY, HH:mm"
  return createdAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export { formatDate };
