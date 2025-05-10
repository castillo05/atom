import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private api: ApiService) {}

    findByEmail(email: string): Observable<User> {
        return this.api.post<User>('/users/find', { email });
    }

    create(email: string): Observable<User> {
        return this.api.post<User>('/users', { email });
    }
} 