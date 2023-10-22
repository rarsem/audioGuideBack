import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CircuitDialogComponent } from '../circuit-dialog/circuit-dialog.component';
import { Circuit } from '../model/circuit.model';
import { tap } from 'rxjs/operators';

import {environment}  from "src/environments/environment"


const BACKEND_URL = environment.apiUrl + "/circuits"
@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  private baseUrl = 'http://localhost:3000'; // Replace with your server URL
  //private apiUrl = '/api/circuits'; // Replace with your API endpoint
  circuits: Circuit[] = []; // Ensure 'Circuit' is the correct type

  constructor(private http: HttpClient , private dialog: MatDialog) {}

  // Getter to access circuits data
  getCircuitsData(): any[] {
    return this.circuits;
  }

  // Method to fetch circuits data from the API
  getCircuits(): Observable<{ message: string, circuits: any[], maxPost: number }> {
    // Make the HTTP GET request and update the circuits data
    return this.http.get<{ message: string, circuits: any[], maxPost: number }>(`${this.baseUrl}/api/circuits`)
      .pipe(
        tap(response => {
          // Update the circuits data when the response is received
          this.circuits = response.circuits;
        })
      );
  }
  // Method to create a new circuit
  createCircuit(circuitData: any): Observable<any> {
    return this.http.post(BACKEND_URL, circuitData);
  }

  openRemoveDialog(circuit: any): void {
    console.log(circuit)
    const dialogRef = this.dialog.open(CircuitDialogComponent, {
      width: '300px', // Adjust the width as needed
      disableClose: true, // Prevent closing by clicking outside

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User clicked "Remove," perform the removal action here
        // You can call your service to remove the circuit from the list
        // Update your circuits array accordingly
        this.removeCircuit(circuit);
      }
    });
  }

  // Add a method to get a circuit by ID
  getCircuitById(circuitId: string): Observable<Circuit> {
    const url = `${BACKEND_URL}/${circuitId}`;
    return this.http.get<Circuit>(url);
  }

  removeCircuit(circuit: any): Observable<any>  {
    const circuitId = circuit._id; // Replace with the appropriate property for circuit ID
    return this.http.delete(`${BACKEND_URL}/${circuitId}`)
  }

  updateCircuit(circuitId: string, updatedCircuit: any): Observable<any> {
    const url = `${BACKEND_URL}/${circuitId}`;
    return this.http.put(url, updatedCircuit);
  }
}
