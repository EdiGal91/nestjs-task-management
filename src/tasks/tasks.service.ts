import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.tasks.find(task => task.id === taskId)
        if(found){
            return found
        }
        throw new NotFoundException(`Task with id ${taskId} not found`)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
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

    deleteTask(taskId: string): true{
        const originalTasksLength = this.tasks.length
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        const newTasksLength = this.tasks.length
        const itemsDeleted = originalTasksLength - newTasksLength
        
        if(itemsDeleted === 0){
            throw new NotFoundException(`Task with id ${taskId} not found`)
        }
        return true
    }

    updateStatus(taskId: string, status: TaskStatus): Task{
        const task = this.getTaskById(taskId);
        task.status = status;
        return task;
    }
}
