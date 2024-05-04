import { Message } from "@/models/Message.ts";
import { axiosInstance } from "@/services/axios.ts";
import { APIResponse } from "@/models/APIResponse.ts";

export async function postMessage(request: Message) {
	return axiosInstance.post<APIResponse>("", { text: request.message });
	// return new Promise<{ data: string }>((resolve) => {
	// 	setTimeout(() => resolve({
	// 		data: "AI will take over the world soon."
	// 	}), 1000);
	// });
}