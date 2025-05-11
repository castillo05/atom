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
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
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
            const tempUserId = uuidv4(); // Generate a temporary ID

            // First generate the token
            this.authService.generateToken(tempUserId, email).subscribe({
                next: () => {
                    // Once we have the token, try to find the user
                    this.userService.findByEmail(email).subscribe({
                        next: (user) => {
                            localStorage.setItem('userId', user.id);
                            this.router.navigate(['/tasks']);
                        },
                        error: () => {
                            // If user doesn't exist, show creation dialog
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