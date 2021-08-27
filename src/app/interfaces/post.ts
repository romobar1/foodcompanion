import { Reply } from "./reply";

export interface Post{
    id: number;
    name: string;
    body: string;
    replies: Reply[];
    userName: string
    datePost: string
}