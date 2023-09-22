import { Component,OnInit, Inject } from '@angular/core';
import { CircuitService } from '../services/circuit.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-circuit-dialog',
  templateUrl: './circuit-dialog.component.html',
  styleUrls: ['./circuit-dialog.component.scss']
})
export class CircuitDialogComponent implements OnInit {

  // Define the circuit object to hold form data
  circuit: any = {
    id: null, // You can initialize other properties as needed
    city: '',
    country: '',
    title: '',
    description: '',
    languages: '',
    distance: null,
    duration: ''
  };

  constructor(private circuitService: CircuitService , 
    public dialogRef: MatDialogRef<CircuitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  // Function to handle form submission

  ngOnInit(): void {
    // Implement any initialization logic here if needed
  }


  onCancelClick(): void {
    this.dialogRef.close(false); // Close the dialog with a "false" result (Cancel)
  }

  onRemoveClick(): void {
    this.dialogRef.close(true); // Close the dialog with a "true" result (Remove)
  }

}
