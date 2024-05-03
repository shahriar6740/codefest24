import React, { useRef } from "react";
import { Message } from "@/models/Message.ts";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils.ts";
import ChatBottomBar from "@/components/ChatBottomBar.tsx";
import { Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar.tsx";
import { UserType } from "@/models/UserType.ts";

type ChatListProps = {
	messages: Message[];
	sendMessage: (message: Message) => void;
	isLoading: boolean;
}

const ChatList = (props: ChatListProps) => {
	const { sendMessage, messages, isLoading } = props;

	const messagesContainerRef = useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
			<div
				ref={messagesContainerRef}
				className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
			>
				<AnimatePresence>
					{messages?.map((row) => (
						<motion.div
							key={row.id}
							layout
							initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
							animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
							exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
							transition={{
								opacity: { duration: 0.1 },
								layout: {
									type: "spring",
									bounce: 0.3,
									duration: messages.indexOf(row) * 0.05 + 0.2
								}
							}}
							style={{
								originX: 0.5,
								originY: 0.5
							}}
							className={cn("flex flex-col gap-2 p-4 whitespace-pre-wrap")}
						>
							<div className={cn("flex gap-2", {
								"justify-start": row.from === UserType.USER,
								"justify-end": row.from === UserType.BOT
							})}>
								<Avatar className="flex justify-center items-center">
									{
										row.from === UserType.USER ?
											<User size={28} /> : <Bot size={28} />
									}
								</Avatar>
								<span className="bg-accent p-3 rounded-md text-base max-w-lg">
                  {row.message}
                </span>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{
				isLoading &&
				<div className="flex items-center justify-start px-3 py-5 ml-auto">
					<div className="h-4 relative p-3 space-x-1 inline-flex ">
						<div className="animate-bounce size-2 delay-0 bg-zinc-400 rounded-full " />
						<div className="animate-bounce size-2 delay-100 bg-zinc-400 rounded-full" />
						<div className="animate-bounce size-2 delay-200 bg-zinc-400 rounded-full" />
					</div>
					<div className="inline-flex items-center">
						<Avatar className="flex justify-center items-center">
							<Bot size={28} />
						</Avatar>
						<span>is typing....</span>
					</div>
				</div>
			}
			<ChatBottomBar sendMessage={sendMessage} isLoading={isLoading} />
		</div>
	);
};

export default ChatList;
