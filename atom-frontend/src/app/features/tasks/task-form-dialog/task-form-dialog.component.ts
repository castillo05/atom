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
    template: `
        <h2 mat-dialog-title>{{data.id ? 'Editar' : 'Nueva'}} Tarea</h2>
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
            <mat-dialog-content>
                <mat-form-field appearance="fill">
                    <mat-label>Título</mat-label>
                    <input matInput formControlName="title" required>
                    <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
                        El título es requerido
                    </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill">
                    <mat-label>Descripción</mat-label>
                    <textarea matInput formControlName="description" rows="4" required></textarea>
                    <mat-error *ngIf="taskForm.get('description')?.hasError('required')">
                        La descripción es requerida
                    </mat-error>
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions align="end">
                <button mat-button (click)="onNoClick()">Cancelar</button>
                <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">
                    {{data.id ? 'Actualizar' : 'Crear'}}
                </button>
            </mat-dialog-actions>
        </form>
    `,
    styles: [`
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }

        mat-dialog-content {
            min-width: 300px;
        }
    `]
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