import axios from "axios";

const url = "http://localhost:7788/api/auth";
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
   
    return await axios.get(`${url}/${id}`, );
  } catch (error) {
    console.log(error);
  }
};