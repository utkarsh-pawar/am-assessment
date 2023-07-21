import axios from "axios";
const baseUrl = "http://localhost:5000/api/v1";
const urls = {
  login: `${baseUrl}/user/login`,
  fetchallData: `${baseUrl}/user/data`,
  updateData: `${baseUrl}/user/updatedata`,
};

export const login = async (data, navigate) => {
  try {
    const response = await axios.post(urls.login, data);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    navigate("/");
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
    if (error.request) {
      console.log(error.request);
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  }
};

export const fetchData = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(urls.fetchallData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
    if (error.request) {
      console.log(error.request);
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  }
};

export const handleDataChange = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(urls.updateData, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      alert(error.response.data);
    }
    if (error.request) {
      console.log(error.request);
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  }
};
