import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-create-user-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Crear nuevo usuario</h2>
        <mat-dialog-content>
            ¿Deseas crear un nuevo usuario con el correo {{data.email}}?
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onNoClick()">Cancelar</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="true">Crear</button>
        </mat-dialog-actions>
    `
})
export class CreateUserDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { email: string }
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
} 