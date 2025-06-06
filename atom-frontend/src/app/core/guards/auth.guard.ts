import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';

export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.isAuthenticated()) {
        router.navigate(['/login']);
        return false;
    }

    return true;
}; 