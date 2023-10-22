import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CircuitDialogComponent } from '../circuit-dialog/circuit-dialog.component';
import { Arret } from '../model/arret.model';
import { tap } from 'rxjs/operators';

import {environment}  from "src/environments/environment"


const BACKEND_URL = environment.apiUrl + "/api/arrets"


@Injectable({
  providedIn: 'root'
})
export class ArretService {

  private baseUrl = 'http://localhost:3000'; // Replace with your server URL
  //private apiUrl = '/api/circuits'; // Replace with your API endpoint
  arrets: Arret[] = []; // Ensure 'Circuit' is the correct type

  constructor(private http: HttpClient , private dialog: MatDialog) {}

  // Getter to access circuits data
  getCircuitsData(): any[] {
    return this.arrets;
  }

  // Method to fetch circuits data from the API
  getArrets(pageIndex: number, pageSize: number): Observable<{ items: any[]; totalItems: number }> {
    // Make the HTTP GET request and update the circuits data
    const url = `${BACKEND_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    console.log(url);
    return this.http.get<{ items: any[]; totalItems: number }>(url)
      .pipe(
        tap(response => {
          // Update the circuits data when the response is received
          this.arrets = response.items;
          console.log(this.arrets);
        })
      );
  }

  // Add a method to get a circuit by ID
  getArretsByCircuitId(circuitId: string , pageIndex: number, pageSize: number): Observable<{ items: any[]; totalItems: number }> {
    //const url = `${this.baseUrl}/api/arrets/${circuitId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
   // Make the HTTP GET request and update the circuits data
   const url = `${BACKEND_URL}/${circuitId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
   return this.http.get<{ items: any[]; totalItems: number }>(url)
     .pipe(
       tap(response => {
         // Update the circuits data when the response is received
         this.arrets = response.items;
       })
     );
  }

  // Add a method to get a arret by ID
  getArretById(idCircuit : string, arretId: string): Observable<Arret> {
    const url = `${BACKEND_URL}/${idCircuit}/${arretId}`;
    return this.http.get<Arret>(url);
  }
  
  // Method to create a new circuit
  createArret(arretData: any): Observable<any> {
    //console.log(arretData);
    return this.http.post(BACKEND_URL, arretData);
    
  }

  openRemoveDialog(id: string): void {
    //console.log(circuit)
    const dialogRef = this.dialog.open(CircuitDialogComponent, {
      width: '300px', // Adjust the width as needed
      disableClose: true, // Prevent closing by clicking outside

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User clicked "Remove," perform the removal action here
        // You can call your service to remove the circuit from the list
        // Update your circuits array accordingly
        this.removeArret(id);
      }
    });
  }

  // // Add a method to get a circuit by ID
  // getCircuitById(circuitId: string): Observable<Circuit> {
  //   const url = `${this.baseUrl}/api/circuits/${circuitId}`;
  //   return this.http.get<Circuit>(url);
  // }

  removeArret(id: string): Observable<any>  {
    return this.http.delete(`${BACKEND_URL}/${id}`)
  }

  updateArret(arretId: string, updatedArret: any): Observable<any> {
    const url = `${BACKEND_URL}/${arretId}`;
    console.log(updatedArret)
    return this.http.put(url, updatedArret);
  }

}
