import { Message } from "@/models/Message.ts";

export async function postMessage(_: Message) {
	return new Promise<{ data: string }>((resolve) => {
		setTimeout(() => resolve({
			data: "AI will take over the world soon."
		}), 1000);
	});
}