import { Component, OnInit , ViewChild, AfterViewInit  } from '@angular/core';
import { ArretService } from '../services/arret.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import the Router module

import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Arret } from '../model/arret.model';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { AuthorizedTouristService } from '../services/authorized-tourist.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';


import { AuthorizationDialogComponent } from '../authorization-dialog/authorization-dialog.component';


@Component({
  selector: 'app-list-autorized',
  templateUrl: './list-autorized.component.html',
  styleUrls: ['./list-autorized.component.scss']
})
export class ListAutorizedComponent {

  temporaryToggleState: boolean = false; // Initialize it with a default value

  authorizedTourist: any[] = [];
  
  searchText: string = ''; // For search input

  displayedColumns: string[] = ['demo-touristInfo', 'demo-circuitInfo', 'demo-authorized','demo-actions' ];

  isListByIdCircuit : boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10; // Number of items per page
  totalItems = 0; // Total number of items from your data source

  @ViewChild(MatTable) myTable!: MatTable<any>;



  constructor(
    private arretService: ArretService, 
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private authorizedService : AuthorizedTouristService,
    private dialog: MatDialog) {}
  

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
      this.getGrantAuth(0);
    }
    
  }

  toggleAuthorization(element: any): void {
    element.demoAuthorized = !element.demoAuthorized;
    // You can perform any additional logic here, such as making API requests to update the authorization status in your backend.
  }

  openAuthorizationDialog(element: any): void {
    const dialogRef = this.dialog.open(AuthorizationDialogComponent, {
      width: '300px', // Adjust the width as needed
      data: { authorization: element } // Pass data to the dialog if needed
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // Perform validation action
      } else {
        // Perform rejection action or do nothing
      }
    });
  }

  openConfirmationDialog(element: any): void {
    // Store the current state in temporaryToggleState
    this.temporaryToggleState = element.authorized;
  
    const dialogRef = this.dialog.open(AuthorizationDialogComponent, {
      width: '300px',
      data: { element }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {

      let { authorization } = result
      if(authorization){
        //console.log(this.authorizedTourist)
        let id = authorization._id
        const index = this.authorizedTourist.findIndex((tourist) => tourist._id === authorization._id);
        if (index !== -1) {
          const updatedAuthorizedTourist = { ...this.authorizedTourist[index], authorized: !this.authorizedTourist[index].authorized };

          // Replace the authorizedTourist object at the found index
          this.authorizedTourist[index] = updatedAuthorizedTourist;
          
          this.myTable.renderRows(); // Trigger a refresh of the table view

        
          console.log(this.authorizedTourist)
          // Now, authorizedTourists[index] is updated with the new data
        } 
      }
      
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    this.getGrantAuth(pageIndex);
  }

  getArretsByIdCircuit(circuitId  : number, pageIndex : number){
    this.arretService.getArretsByCircuitId(circuitId.toString(), pageIndex + 1 , this.pageSize).subscribe((value) => {
      //console.log(data)
      //this.arrets = data.;
      this.authorizedTourist = value.items;
      this.totalItems = value.totalItems; // Update the total number of items

    });
  }
  getGrantAuth(pageIndex : number ): void {
    this.authorizedService.getGrantAuth(pageIndex + 1, this.pageSize).subscribe(( value ) => {

      console.log(value)
      this.authorizedTourist = value.items;
      this.totalItems = value.totalItems; // Update the total number of items

    });
  }

  editArret(idCircuit: string, arretId: string) {
    //console.log(circuitId);
    this.router.navigate(['edit-arret',idCircuit, arretId]);
  }

  // removeArret(arret: any): void {
  //   const arretId = arret._id; // Replace with the appropriate property for circuit ID
  //   this.arretService.removeArret(arretId).subscribe({
  //     next: () => {
  //       // Remove the circuit from the local array
  //       this.arrets = this.arrets.filter(c => c._id !== arretId);
  //       this.openSnackBar('Circuit deleted successfully', 'OK');
  //     },
  //     error: (error) => {
  //       console.error('Error deleting circuit:', error);
  //     }
  //   });
  // }

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
