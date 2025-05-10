import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../../data/services/task.service';
import { Task } from '../../../data/models/task.model';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    template: `
        <div class="task-list-container">
            <div class="header">
                <h1>Mis Tareas</h1>
                <div class="actions">
                    <button mat-raised-button color="primary" (click)="openTaskDialog()">
                        <mat-icon>add</mat-icon>
                        Nueva Tarea
                    </button>
                    <button mat-raised-button color="warn" (click)="logout()">
                        <mat-icon>exit_to_app</mat-icon>
                        Salir
                    </button>
                </div>
            </div>

            <div class="tasks">
                <mat-card *ngFor="let task of tasks">
                    <mat-card-header>
                        <mat-card-title>{{task.title}}</mat-card-title>
                        <mat-card-subtitle>Creada: {{task.createdAt | date}}</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content>
                        <p>{{task.description}}</p>
                    </mat-card-content>
                    <mat-card-actions>
                        <mat-checkbox
                            [checked]="task.completed"
                            (change)="toggleTaskStatus(task)">
                            {{task.completed ? 'Completada' : 'Pendiente'}}
                        </mat-checkbox>
                        <button mat-icon-button color="primary" (click)="openTaskDialog(task)">
                            <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="deleteTask(task)">
                            <mat-icon>delete</mat-icon>
                        </button>
                    </mat-card-actions>
                </mat-card>
            </div>
        </div>
    `,
    styles: [`
        .task-list-container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .actions {
            display: flex;
            gap: 10px;
        }

        .tasks {
            display: grid;
            gap: 20px;
        }

        mat-card {
            margin-bottom: 16px;
        }

        mat-card-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px;
        }
    `]
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    userId: string | null = null;

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        if (this.userId) {
            this.taskService.getAll(this.userId).subscribe(tasks => {
                this.tasks = tasks;
            });
        }
    }

    openTaskDialog(task?: Task) {
        const dialogRef = this.dialog.open(TaskFormDialogComponent, {
            width: '500px',
            data: task || { userId: this.userId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.id) {
                    this.taskService.update(result.id, result).subscribe(() => {
                        this.loadTasks();
                    });
                } else {
                    this.taskService.create(result).subscribe(() => {
                        this.loadTasks();
                    });
                }
            }
        });
    }

    toggleTaskStatus(task: Task) {
        const updatedTask = { ...task, completed: !task.completed };
        this.taskService.update(task.id, updatedTask).subscribe(() => {
            this.loadTasks();
        });
    }

    deleteTask(task: Task) {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            this.taskService.delete(task.id).subscribe(() => {
                this.loadTasks();
            });
        }
    }

    logout() {
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }
} 