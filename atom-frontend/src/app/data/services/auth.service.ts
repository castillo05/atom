import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpService) {}

    generateToken(uid: string, email: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/users/generate-token', { uid, email })
            .pipe(
                tap(response => {
                    localStorage.setItem('token', response.token);
                })
            );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
} 