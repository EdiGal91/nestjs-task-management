import { Task, TaskStatus } from "./tasks.model";
import { TasksService } from "./tasks.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {
    const task1 = new CreateTaskDto();
    task1.title = "t1";
    task1.description = "d1";
    this.tasksService.createTask(task1);

    const task2 = new CreateTaskDto();
    task2.title = "t2";
    task2.description = "d2";
    task2.status = TaskStatus.IN_PROGRESS;
    this.tasksService.createTask(task2);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") taskId: string): true {
    return this.tasksService.deleteTask(taskId);
  }

  @Post("/:id/status")
  @UsePipes(ValidationPipe)
  updateStatus(
    @Param("id") taskId: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateStatus(taskId, status);
  }
}
