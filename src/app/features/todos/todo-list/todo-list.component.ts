import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodosService, Todo } from '../todos.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

type FilterType = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  editingId: number | null = null;
  editForm!: FormGroup;
  filter: FilterType = 'all';

  constructor(
    public todoService: TodosService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

  // Filters
  setFilter(value: FilterType) {
    this.filter = value;
  }

  filteredTasks() {
    const tasks = this.todoService.tasks();
    if (!tasks) return [];
    if (this.filter === 'completed') return tasks.filter((t) => t.completed);
    if (this.filter === 'pending') return tasks.filter((t) => !t.completed);
    return tasks;
  }

  // Editing
  startEdit(task: Todo) {
    this.editingId = task.id!;
    this.editForm = this.fb.group({
      title: [task.title],
      description: [task.description],
    });
  }

  saveEdit() {
    if (this.editingId !== null) {
      this.todoService.updateTask(this.editingId, this.editForm.value);
      this.editingId = null;
    }
  }

  cancelEdit() {
    this.editingId = null;
  }

  // Toggle task
  toggleTask(task: Todo) {
    this.todoService.toggleTaskCompleted(task);
  }

  // Remove task
  removeTask(task: Todo) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { title: task.title },
  });

  dialogRef.afterClosed().subscribe((confirmed) => {
    if (confirmed && task.id) {
      this.todoService.removeTask(task.id);
    }
  });
}

  // Clear completed tasks
  clearCompleted() {
    this.todoService.clearCompleted();
  }

  hasCompletedTasks(): boolean {
  return this.todoService.tasks().some((t) => !!t.completed);
}

}
