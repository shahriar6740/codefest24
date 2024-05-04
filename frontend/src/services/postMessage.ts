import { Message } from "@/models/Message.ts";
import { axiosInstance } from "@/services/axios.ts";
import { APIResponse } from "@/models/APIResponse.ts";

export async function postMessage(request: Message) {
	return axiosInstance.post<APIResponse>("", { text: request.message });
}