import { SendHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { cn, getCurrentFormattedDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Message } from "@/models/Message.ts";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/models/UserType";

type ChatBottomBarProps = {
	sendMessage: (message: Message) => void;
	isLoading: boolean;
}

const ChatBottomBar = (props: ChatBottomBarProps) => {
	const { sendMessage, isLoading } = props;
	const [message, setMessage] = useState("");
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
	}, []);

	const handleSend = useCallback(() => {
		if (message.trim()) {
			const newMessage: Message = {
				id: message.length + 1,
				from: UserType.USER,
				message: message.trim(),
				date: getCurrentFormattedDate()
			};
			sendMessage(newMessage);
			setMessage("");
		}
	}, [sendMessage, message]);

	const handleKeyPress = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}

		if (event.key === "Enter" && event.shiftKey) {
			event.preventDefault();
			setMessage((prev) => prev + "\n");
		}
	}, [handleSend]);

	useEffect(() => {
		if (!isLoading) {
			inputRef.current?.focus();
		}
	}, [isLoading]);

	return (
		<div className="p-2 flex justify-between w-full items-center gap-2">
			<AnimatePresence initial={false}>
				<motion.div
					key="input"
					className="w-full relative"
					layout
					initial={{ opacity: 0, scale: 1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1 }}
					transition={{
						opacity: { duration: 0.05 },
						layout: {
							type: "spring",
							bounce: 0.15
						}
					}}
				>
					<Textarea
						autoComplete="off"
						value={message}
						disabled={isLoading}
						ref={inputRef}
						onKeyDown={handleKeyPress}
						onChange={handleInputChange}
						name="message"
						placeholder="Ask me anything..."
						className=" w-full border-2 border-primary max-h-52 min-h-[100px] overflow-auto flex items-center resize-none bg-transparent"
					/>
				</motion.div>
				<Button
					disabled={isLoading}
					variant="ghost"
					className={cn(
						"size-9",
						"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 p-0"
					)}
					onClick={handleSend}
				>
					<SendHorizontal className="" />
				</Button>
			</AnimatePresence>
		</div>
	);
};

export default ChatBottomBar;
