import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export abstract class SmartService<T> {
  protected records = signal<T[]>([]);
  
  private http = inject(HttpService);

  getRecords() {
    return this.records;
  }

  fetchAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(endpoint).pipe(
      tap(data => this.records.set(data))
    );
  }

  findAll(): T[] {
    return this.records();
  }

  create(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(endpoint, payload).pipe(
      tap(newRecord => this.records.update(records => [...records, newRecord]))
    );
  }

  update(endpoint: string, id: any, payload: any): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, payload).pipe(
      tap(updated => this.records.update(records => records.map(record => this.getId(record) === id ? updated : record)))
    );
  }

  delete(endpoint: string, id: any): Observable<void> {
    return this.http.delete<void>(`${endpoint}`).pipe(
      tap(() => this.records.update(records => records.filter(record => this.getId(record) !== id)))
    );
  }

  protected abstract getId(record: T): any;
}