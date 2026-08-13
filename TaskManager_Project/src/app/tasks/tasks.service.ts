import type { NewTask } from './task/task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
private tasks = [
    {id: 't1', userId: 'u1', title: 'Prepare Issue', summary: 'Summary of task 1', dueDate: '2024-06-30'},
    {id: 't2', userId: 'u2', title: 'Master Angular', summary: 'Summary of task 2', dueDate: '2024-07-15'},
    {id: 't3', userId: 'u3', title: 'Task 3', summary: 'Summary of task 3', dueDate: '2024-08-01'},
];

constructor() { 
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        this.tasks = JSON.parse(tasks);
    }
}

getUserTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId);
}

addTask(taskData: NewTask, userId: string) {
    this.tasks.unshift({
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.dueDate
    });
    this.saveTasks();
}

removeTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks
}

private saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}
}
