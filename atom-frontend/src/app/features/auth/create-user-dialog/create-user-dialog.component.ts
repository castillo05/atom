import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-create-user-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './create-user-dialog.component.html'
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