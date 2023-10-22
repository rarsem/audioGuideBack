import { Component, OnInit , ViewChild, AfterViewInit  } from '@angular/core';
import { ArretService } from '../services/arret.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import the Router module

import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Arret } from '../model/arret.model';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {environment}  from "src/environments/environment"


@Component({
  selector: 'app-arret-list',
  templateUrl: './arret-list.component.html',
  styleUrls: ['./arret-list.component.scss']
})
export class ArretListComponent implements OnInit  {
  arrets: any[] = [];
  searchText: string = ''; // For search input

  displayedColumns: string[] = ['demo-image', 'demo-title', 'demo-order','demo-actions' ];

  isListByIdCircuit : boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10; // Number of items per page
  totalItems = 0; // Total number of items from your data source

  baseUrl = environment.apiUrl;

  constructor(
    private arretService: ArretService, 
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location) {}
  

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const circuitId = this.route.snapshot.params['idCircuit'];

    if (circuitId) {
      // Editing an existing circuit
      this.isListByIdCircuit = true;
      this.getArretsByIdCircuit(circuitId, 0)
    
    }else {
      this.getArrets(0);
    }
    
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const circuitId = this.route.snapshot.params['id'];
    if (circuitId) {
      // Editing an existing circuit
      this.isListByIdCircuit = true;
      this.getArretsByIdCircuit(circuitId, pageIndex)
    
    }else {
      this.getArrets(pageIndex);
    }
    
  }

  getArretsByIdCircuit(circuitId  : number, pageIndex : number){
    this.arretService.getArretsByCircuitId(circuitId.toString(), pageIndex + 1 , this.pageSize).subscribe((value) => {
      //console.log(data)
      //this.arrets = data.;
      this.arrets = value.items;
      this.totalItems = value.totalItems; // Update the total number of items

    });
  }
  getArrets(pageIndex : number ): void {
    this.arretService.getArrets(pageIndex + 1, this.pageSize).subscribe(( value ) => {
      this.arrets = value.items;
      this.totalItems = value.totalItems; // Update the total number of items

    });
  }

  editArret(idCircuit: string, arretId: string) {
    //console.log(circuitId);
    this.router.navigate(['edit-arret',idCircuit, arretId]);
  }

  removeArret(arret: any): void {
    const arretId = arret._id; // Replace with the appropriate property for circuit ID
    this.arretService.removeArret(arretId).subscribe({
      next: () => {
        // Remove the circuit from the local array
        this.arrets = this.arrets.filter(c => c._id !== arretId);
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

}
