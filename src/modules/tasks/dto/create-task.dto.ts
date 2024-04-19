import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Priority{
    Low = "low",
    Intermediary = "intermediary",
    Emergency = "emergency"
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Priority)
    priority: Priority
}
