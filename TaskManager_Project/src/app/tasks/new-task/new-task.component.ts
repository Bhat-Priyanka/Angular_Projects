import { Component, EventEmitter, Output, signal, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  // imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
@Input({required: true}) userId!: string;
@Output() close = new EventEmitter<void>();
enteredTitle = signal('');
enteredSummary = signal('');
enteredDueDate = signal('');

private taskService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
   this.taskService.addTask({
    title: this.enteredTitle(),
    summary: this.enteredSummary(),
    dueDate: this.enteredDueDate()
   }, this.userId);
  }

}
