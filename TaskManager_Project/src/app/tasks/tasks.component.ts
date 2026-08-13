import { Component, Input } from '@angular/core';
import {TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  // imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) name: string | undefined;
  @Input({required: true}) userId!: string;
  isAddingTask = false;

  constructor(private tasksService: TasksService) {
  }

  tasks = [
    {id: 't1', userId: 'u1', title: 'Prepare Issue', summary: 'Summary of task 1', dueDate: '2024-06-30'},
    {id: 't2', userId: 'u2', title: 'Master Angular', summary: 'Summary of task 2', dueDate: '2024-07-15'},
    {id: 't3', userId: 'u3', title: 'Task 3', summary: 'Summary of task 3', dueDate: '2024-08-01'},
  ];

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask()
  {
    this.isAddingTask = false;
  }
}