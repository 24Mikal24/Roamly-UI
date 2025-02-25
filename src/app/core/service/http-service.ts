import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpService {
    private http = inject(HttpClient);
    private defaultOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    static get httpResponseCache(): { [name: string]: HttpResponse<any> } {

        const stringifiedHttpResponseCache = localStorage.getItem('httpResponseCache');
        if (!stringifiedHttpResponseCache) { return {}; }

        return JSON.parse(stringifiedHttpResponseCache);
    }

    static set httpResponseCache(httpResponseCache: { [name: string]: HttpResponse<any> }) {
        localStorage.setItem('httpResponseCache', JSON.stringify(httpResponseCache));
    }

    get<T>(url: string) {
        return this.http.get<T>(url);
    }

    getWithCaching<T>(url: string): Observable<T> {
        const headers = new HttpHeaders({'Cache-Control': 'max-age=604800, PUBLIC'});
        return this.http.get<T>(url, { headers });
    }

    post<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders;
        observe?: 'body';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        return this.http.post<T>(url, body, options || this.defaultOptions);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url, { responseType: 'json'});
    }

    put<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders,
        observe?: 'body',
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        return this.http.put<T>(url, body, options || this.defaultOptions);
    }
}