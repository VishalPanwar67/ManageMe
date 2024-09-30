import axios from "axios";

const checkAuth = async () => {
  try {
    const response = await axios.get("/api/auth/me", {});
    console.log("Authentication check successful:", response.data);

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};

export default checkAuth;
