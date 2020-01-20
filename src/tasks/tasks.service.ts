import { Task, TaskStatus } from './tasks.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v4'
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string, status: TaskStatus = TaskStatus.OPEN) :Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status
        }
        this.tasks.push(task)
        return task
    }
}
