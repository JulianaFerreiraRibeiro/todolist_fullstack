import { randomUUID } from "crypto";

export class Folder {
    readonly id: string;
    title: string;
    description: string;
    userId: string;

    constructor(){
        this.id = randomUUID()
    }

}
