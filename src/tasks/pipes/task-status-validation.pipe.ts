import { TaskStatus } from "./../tasks.model";
import { PipeTransform, BadRequestException } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log(value, value);
    if (!value || value in TaskStatus) return value;
    throw new BadRequestException("Invalid status");
  }
}
