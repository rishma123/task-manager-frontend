import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { TodoFormComponent } from './features/todos/todo-form/todo-form.component';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'todos',
        component: TodoListComponent,
      },
      {
        path: 'todos/new',
        component: TodoFormComponent,
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];
