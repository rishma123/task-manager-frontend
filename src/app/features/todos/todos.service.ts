import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly API_URL = 'https://task-manager-backend-ljz8.onrender.com/tasks';

  // Local state with Angular signals
  tasks = signal<Todo[]>([]);

  // Computed signals for stats
  completedTasks = computed(() => this.tasks().filter(t => t.completed));
  pendingTasks = computed(() => this.tasks().filter(t => !t.completed));

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {
    this.loadTasks();
  }

  // Utility: show snackbar
  private notify(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  // Load tasks from backend
  loadTasks() {
    this.http.get<Todo[]>(this.API_URL).subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: () => this.notify('❌ Failed to load tasks'),
    });
  }

  // Add new task
  addTask(task: Todo) {
    this.http.post<Todo>(this.API_URL, task).subscribe((newTask) => {
      this.tasks.update((current) => [...current, newTask]);
      this.notify('✅ Task added');
    });
  }

  // Update task
  updateTask(id: number, updates: Partial<Todo>) {
    this.http.put<Todo>(`${this.API_URL}/${id}`, updates).subscribe((updated) => {
      this.tasks.update((current) =>
        current.map((task) => (task.id === id ? updated : task))
      );
      this.notify('✏️ Task updated');
    });
  }

  // Remove task
  removeTask(id: number) {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.tasks.update((current) => current.filter((task) => task.id !== id));
      this.notify('🗑 Task deleted');
    });
  }

  // Toggle complete
  toggleTaskCompleted(task: Todo) {
    if (!task.id) return;
    this.updateTask(task.id, { completed: !task.completed });
  }

  // Clear all completed
  clearCompleted() {
    const completed = this.tasks().filter((t) => t.completed && t.id);
    completed.forEach((task) => {
      if (task.id) this.removeTask(task.id);
    });
    if (completed.length > 0) {
      this.notify('🧹 Cleared completed tasks');
    }
  }
}
