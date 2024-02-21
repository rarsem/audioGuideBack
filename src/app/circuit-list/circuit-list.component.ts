import { Component, OnInit, ViewChild } from '@angular/core';
import { CircuitService } from '../services/circuit.service';
import { Router } from '@angular/router'; // Import the Router module

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


import { Subscription } from 'rxjs';

import {environment}  from "src/environments/environment"


export interface circuitElement {
  titre: string;
  ville: number;
  coun: number;
  symbol: string;
}

@Component({
  selector: 'app-circuit-list',
  templateUrl: './circuit-list.component.html',
  styleUrls: ['./circuit-list.component.scss']
})
export class CircuitListComponent implements OnInit {
  circuits: any[] = [];
  searchText: string = ''; // For search input
  private authStatusSub! : Subscription;
  isAuthenticated: boolean = false;

  displayedColumns: string[] = ['demo-image', 'demo-title', 'demo-city', 'demo-country','demo-actions' ];

  baseUrl = environment.apiUrl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10; // Number of items per page
  totalItems = 0; // Total number of items from your data source


  constructor(private circuitService: CircuitService, private router: Router,
    private snackBar: MatSnackBar, 
    private authService : AuthService) {}

  ngOnInit(): void {

    this.isAuthenticated = this.authService.isAuthenticated();

  //   this.authStatusSub = this.authService.getAuthStatusListner().subscribe((authStatus : any) => {
  //     //this.isLoading = false;
  // })

    this.getCircuits(0);
  }

  getCircuits(pageIndex : number ): void {
    this.circuitService.getCircuits(pageIndex + 1, this.pageSize).subscribe(( value ) => {
      //console.log(value)
      this.circuits = value.circuits;
      this.totalItems = value.totalItems; // Update the total number of items
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    this.getCircuits(pageIndex);
  }


  // Method to redirect to the New Circuit page
  redirectToAllArrets() {
    this.router.navigate(['/arrets']); // Navigate to the New Circuit page
  }

  arretsByCircuitId(idCircuit : string){
    this.router.navigate(['/arrets' , idCircuit])
  }
   // Method to redirect to the New Circuit page
  redirectToNewCircuit() {
    this.router.navigate(['/create-circuit']); // Navigate to the New Circuit page
  }
  
  // Method to redirect to the New Circuit page
  redirectToNewArret(circuitId: string) {
    this.router.navigate(['/create-arret' , circuitId]); // Navigate to the New Circuit page
  }

  editCircuit(circuitId: string) {
    //console.log(circuitId);
    this.router.navigate(['edit-circuit', circuitId]);
  }

  removeCircuit(circuit: any): void {
    const circuitId = circuit._id; // Replace with the appropriate property for circuit ID
    this.circuitService.removeCircuit(circuit).subscribe({
      next: () => {
        // Remove the circuit from the local array
        this.circuits = this.circuits.filter(c => c._id !== circuitId);

        this.openSnackBar('Circuit deleted successfully', 'OK');
      },
      error: (error) => {
        console.error('Error deleting circuit:', error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    });
  }

  // Function to handle search
  onSearch() {
    // Implement search logic here based on the 'searchText' value
    // Update the 'circuits' array with filtered results
  }

  // Function to clear search
  clearSearch() {
    this.searchText = '';
    // Reset the 'circuits' array to show all circuits
  }
  ngOnDestroy(){
    //this.postsSub.unsubscribe();
    //this.authStatusSub.unsubscribe();
  }
  
}