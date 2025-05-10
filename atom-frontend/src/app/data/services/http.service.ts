import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    private getHeaders(token?: string): HttpHeaders {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return token ? headers.set('Authorization', `Bearer ${token}`) : headers;
    }

    get<T>(endpoint: string, token?: string) {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders(token) });
    }

    post<T>(endpoint: string, data: any, token?: string) {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders(token) });
    }

    put<T>(endpoint: string, data: any, token?: string) {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders(token) });
    }

    delete<T>(endpoint: string, token?: string) {
        return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders(token) });
    }
} 