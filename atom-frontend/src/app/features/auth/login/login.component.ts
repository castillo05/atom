import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../data/services/user.service';
import { AuthService } from '../../../data/services/auth.service';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    template: `
        <div class="login-container">
            <h1>Bienvenido</h1>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="fill">
                    <mat-label>Correo electrónico</mat-label>
                    <input matInput type="email" formControlName="email" required>
                    <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                        El correo es requerido
                    </mat-error>
                    <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                        Ingrese un correo válido
                    </mat-error>
                </mat-form-field>
                <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
                    Ingresar
                </button>
            </form>
        </div>
    `,
    styles: [`
        .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            padding: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            gap: 20px;
        }

        mat-form-field {
            width: 100%;
        }

        button {
            width: 100%;
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email')?.value;
            const tempUserId = uuidv4(); // Generamos un ID temporal

            // Primero generamos el token
            this.authService.generateToken(tempUserId, email).subscribe({
                next: () => {
                    // Una vez que tenemos el token, intentamos encontrar al usuario
                    this.userService.findByEmail(email).subscribe({
                        next: (user) => {
                            localStorage.setItem('userId', user.id);
                            this.router.navigate(['/tasks']);
                        },
                        error: () => {
                            // Si el usuario no existe, mostramos el diálogo de creación
                            const dialogRef = this.dialog.open(CreateUserDialogComponent, {
                                data: { email }
                            });

                            dialogRef.afterClosed().subscribe(result => {
                                if (result) {
                                    this.userService.create(email).subscribe(user => {
                                        localStorage.setItem('userId', user.id);
                                        this.router.navigate(['/tasks']);
                                    });
                                }
                            });
                        }
                    });
                },
                error: (error) => {
                    console.error('Error al generar token:', error);
                }
            });
        }
    }
} 