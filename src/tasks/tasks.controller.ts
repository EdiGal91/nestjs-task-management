import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
        this.tasksService.createTask('t1', 'd1')
        this.tasksService.createTask('t2', 'd2')
    }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks()
    }

    @Post()
    createTask(@Body() body) :Task {
        const { title, description, status } = body
        return this.tasksService.createTask(title, description, status)
    }
}
