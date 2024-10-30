import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment}  from "src/environments/environment"

const BACKEND_URL = environment.apiUrl + "/api/apiVersion"

@Injectable({
  providedIn: 'root'
})
export class ApiversionService {

  constructor(private http: HttpClient) { }

  // Method to insert a new version
  insertVersion(version: string, description: string): Observable<any> {
    const body = { version, description };
    return this.http.post(BACKEND_URL, body);
  }

  // Method to get the current version
  getCurrentVersion(): Observable<any> {
    return this.http.get(BACKEND_URL);
  }
}
