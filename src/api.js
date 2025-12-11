import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/chat";

export const fetchHistory = async () => {
  const res = await axios.get(`${API_BASE_URL}/history`);
  return res.data;
};

export const sendMessageToServer = async (message) => {
  const res = await axios.post(`${API_BASE_URL}/send-message`, { message });
  return res.data;
};
