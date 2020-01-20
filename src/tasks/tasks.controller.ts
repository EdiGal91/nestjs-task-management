import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
        this.tasksService.createTask('t1', 'd1')
        this.tasksService.createTask('t2', 'd2', TaskStatus.IN_PROGRESS)
    }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks()
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('status') status: TaskStatus,
    ) :Task {
        return this.tasksService.createTask(title, description, status)
    }
}
