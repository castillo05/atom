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
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
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
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.delete(task.id).subscribe(() => {
                this.loadTasks();
            });
        }
    }

    logout() {
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }

    trackByTaskId(index: number, task: Task): string {
        return task.id;
    }
} 