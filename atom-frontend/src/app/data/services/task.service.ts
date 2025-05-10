import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private api: ApiService) {}

    getAll(userId: string): Observable<Task[]> {
        return this.api.get<Task[]>(`/tasks/user/${userId}`);
    }

    create(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
        return this.api.post<Task>('/tasks', task);
    }

    update(id: string, task: Partial<Task>): Observable<Task> {
        return this.api.put<Task>(`/tasks/${id}`, task);
    }

    delete(id: string): Observable<void> {
        return this.api.delete<void>(`/tasks/${id}`);
    }
} 