import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCurrentFormattedDate() {
	const currentDate = new Date();
	return currentDate.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});
}
