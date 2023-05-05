import axios from "axios";

const url = "http://localhost:7788/api/auth";
const adminURL = "http://localhost:7788/api/admin";
const url2 = "http://localhost:7788/api/game";

export const signin = async (data: {}) => {
  try {
    return await axios.post(`${url}/sign-in`, data);
  } catch (error) {
    console.log(error);
  }
};

export const viewGames = async (token: string) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer CodeLab ${token}`,
      },
    };
    return await axios.get(`${url2}`, config);
  } catch (error) {
    console.log(error);
  }
};

export const refreshGame = async (token: string) => {
  try {
    return await axios.post(`${url}/refresh`, { refreshToken: token });
  } catch (error) {
    console.log(error);
  }
};

export const viewUser = async (id: string) => {
  try {
    return await axios.get(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const verifyUser = async (id: string) => {
  try {
    return await axios.get(`${url}/${id}/verify`);
  } catch (error) {
    console.log(error);
  }
};

export const verifyAdmin = async (id: string) => {
  try {
    return await axios.get(`${adminURL}/${id}/verify`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const finallyVerified = async (id: string) => {
  try {
    return await axios.get(`${url}/${id}/finally`);
  } catch (error) {
    console.log(error);
  }
};

export const verifyStaffAccount = async (id: string, data: {}) => {
  try {
    return await axios.post(`${url}/${id}/verify`, data);
  } catch (error) {
    console.log(error);
  }
};