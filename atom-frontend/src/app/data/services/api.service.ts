import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpService,
        private authService: AuthService
    ) {}

    get<T>(endpoint: string) {
        return this.http.get<T>(endpoint, this.authService.getToken() || undefined);
    }

    post<T>(endpoint: string, data: any) {
        return this.http.post<T>(endpoint, data, this.authService.getToken() || undefined);
    }

    put<T>(endpoint: string, data: any) {
        return this.http.put<T>(endpoint, data, this.authService.getToken() || undefined);
    }

    delete<T>(endpoint: string) {
        return this.http.delete<T>(endpoint, this.authService.getToken() || undefined);
    }
} 