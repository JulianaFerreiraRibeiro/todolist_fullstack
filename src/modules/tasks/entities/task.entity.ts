import { randomUUID } from "crypto";

type Priority = "low" | "intermediary" | "emergency"

export class Task {
    readonly id: string;
    title: string;
    description: string;
    userId: string;
    folderId: string;
    priority: Priority;

    constructor(){
        this.id = randomUUID()
    }
}
