import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../data/models/task.model';

@Component({
    selector: 'app-task-form-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './task-form-dialog.component.html',
    styleUrls: ['./task-form-dialog.component.scss']
})
export class TaskFormDialogComponent {
    taskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TaskFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Partial<Task>
    ) {
        this.taskForm = this.fb.group({
            title: [data.title || '', Validators.required],
            description: [data.description || '', Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.taskForm.valid) {
            const task = {
                ...this.data,
                ...this.taskForm.value
            };
            this.dialogRef.close(task);
        }
    }
} 