import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CircuitDialogComponent } from '../circuit-dialog/circuit-dialog.component';
import { Arret } from '../model/arret.model';
import { tap } from 'rxjs/operators';

import {environment}  from "src/environments/environment"

const BACKEND_URL = environment.apiUrl + "/user"
@Injectable({
  providedIn: 'root'
})
export class AuthorizedTouristService {
  private baseUrl = 'http://localhost:3000'; // Replace with your server URL

  authorizedTourist: any[] = []; // Ensure 'Circuit' is the correct type

  constructor(private http: HttpClient) {}


  // Method to fetch circuits data from the API
  getGrantAuth(pageIndex: number, pageSize: number): Observable<{ items: any[]; totalItems: number }> {
    // Make the HTTP GET request and update the circuits data
    const url = `${this.baseUrl}/api/grant-authorization?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<{ items: any[]; totalItems: number }>(url)
      .pipe(
        tap(response => {
          // Update the circuits data when the response is received
          this.authorizedTourist = response.items;
        })
      );
  }
  toggleAuthorization(id: string) {
    const url = `${this.baseUrl}/api/grant-authorization/${id}`;
    return this.http.put(url, {});
  }
}