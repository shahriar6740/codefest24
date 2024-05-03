import React, { useState } from "react";
import ChatList from "@/components/ChatList";
import { Message } from "@/models/Message";
import { UserType } from "@/models/UserType";
import { postMessage } from "@/services/postMessage";

type ChatBoxProps = {
	messages?: Message[];
}

const ChatBox = (props: ChatBoxProps) => {
	const { messages } = props;
	const [messagesState, setMessages] = React.useState<Message[]>(messages ?? []);
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = async (userPrompt: Message) => {
		setMessages(prevMessage => [...prevMessage, userPrompt]);
		try {
			setIsLoading(true);
			const response = await postMessage(userPrompt);
			setMessages(prevMessage => [
				...prevMessage,
				{
					message: response.data,
					from: UserType.BOT,
					id: messagesState.length + 1
				}
			]);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ChatList isLoading={isLoading} messages={messagesState} sendMessage={sendMessage} />
	);
};

export default ChatBox;
