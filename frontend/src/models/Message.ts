import { UserType } from "@/models/UserType.ts";


export interface Message {
	id: number;
	from: UserType;
	message: string;
	date: string;
}