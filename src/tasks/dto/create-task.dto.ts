import { TaskStatus } from "../tasks.model";
import { IsNotEmpty } from "class-validator";
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status: TaskStatus;
}
