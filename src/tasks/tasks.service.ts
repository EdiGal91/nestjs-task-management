import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v4'
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(taskId): Task {
        return this.tasks.find(task => task.id === taskId)
    }

    createTask(createTaskDto: CreateTaskDto) :Task {
        const { title, description, status = TaskStatus.OPEN } = createTaskDto
        console.log('service createTask status::', status)
        const task: Task = {
            id: uuid(),
            title,
            description,
            status
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(taskId: string): boolean{
        const originalTasksLength = this.tasks.length
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        const newTasksLength = this.tasks.length

        const itemsDeleted = originalTasksLength - newTasksLength
        return itemsDeleted > 0
    }
}
