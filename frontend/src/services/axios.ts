import axios from "axios";

export const axiosInstance = axios.create({
	method: "POST",
	baseURL: "http://0:0:0:0:8000"
});