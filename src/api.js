import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";


export const loginUser = async (username, password) => {
  return axios.post(`${BASE_URL}/login`, { username, password });
};


export const getUserName = async (userId) => {
    return axios.post(`${BASE_URL}/get-name`, { id: userId });
};

export const whatnew =async ()=>{
  return axios.get(`${BASE_URL}/whatnew`)
}