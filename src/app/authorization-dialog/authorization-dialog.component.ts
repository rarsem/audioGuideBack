import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorizedTouristService } from '../services/authorized-tourist.service';


@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss']
})
export class AuthorizationDialogComponent {




  //confirmationResult: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private authTouristService: AuthorizedTouristService,
  private dialogRef: MatDialogRef<AuthorizationDialogComponent>
  ) {
    //this.confirmationResult = this.isChecked();
  }

  toggleAuthorization(id: string) {
    return this.authTouristService.toggleAuthorization(id)
  }

  isChecked(): void {
    this.toggleAuthorization(this.data.element._id).subscribe((response: any) => {
      // Handle the response here, e.g., update the element in your frontend data
      console.log('Authorization toggled:', response);
  
      // Close the dialog after the operation is completed
      this.dialogRef.close(response);
    });
  }

}
