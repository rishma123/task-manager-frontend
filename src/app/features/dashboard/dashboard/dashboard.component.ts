import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFormComponent } from "../../todos/todo-form/todo-form.component";
import { TodoListComponent } from "../../todos/todo-list/todo-list.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [TodoFormComponent, TodoListComponent, MatCardModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private readonly router: Router) {}

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login'])
  }

}
