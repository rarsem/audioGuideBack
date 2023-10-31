import { Component, ElementRef ,  ViewChild  } from '@angular/core';
import { ArretService } from '../services/arret.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Arret } from '../model/arret.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

import { MapPopoverComponent } from '../map-popover/map-popover.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment}  from "src/environments/environment"


@Component({
  selector: 'app-arret-create',
  templateUrl: './arret-create.component.html',
  styleUrls: ['./arret-create.component.scss']
})
export class ArretCreateComponent {

  // Create a new Circuit object with type assertion
 newArret: Arret = {

  mapContent: { 
    lat : 0.0,
    lng : 0.0
  } as { lat: number; lng: number }, // Type assertion
} as Arret;

isEditMode: boolean = false;
languageOptions: string[] = ['Français', 'Anglais', 'Arabe'];
selectedImage: File | undefined;
audioFile : File | undefined;
existingImageUrl: string | null = null; // Initialize as null
audioPath : string | null = null;
private baseUrl = environment.apiUrl;



readonlyMode: boolean = true;

loading : boolean  = true;

latitude: number = 0;
longitude: number = 0;

mapContentLat: number = 0;
mapContentLng: number = 0;
specificDestinations : any[] = [];

@ViewChild('audioPlayer') audioPlayer!: ElementRef;
@ViewChild('fileInput') fileInput!: ElementRef ;

audioFileName: string = '';


constructor(
  private arretService: ArretService,
  private route: ActivatedRoute,
  private router: Router,
  private snackBar: MatSnackBar,
  private location: Location,
  private http: HttpClient,
  private dialog: MatDialog
) {}

 
onFileSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.audioPlayer.nativeElement.src = e.target.result;
      this.audioFileName = file.name;
    };

    reader.readAsDataURL(file);
    this.audioFile = file;
    console.log(this.audioFile)
  } else {
    // Clear the audio player when no file is selected
    this.audioPlayer.nativeElement.src = '';
    this.audioFileName = '';
    // Reset the audioFile property
    this.audioFile = undefined;
  }
}

goBack(): void {
  this.location.back();
}

ngOnInit(): void {
  const arretId = this.route.snapshot.params['id'];
  const idCircuit = this.route.snapshot.params['idCircuit']

  console.log(arretId)

    if (arretId) {
      // Editing an existing circuit
      this.isEditMode = true;
      this.arretService.getArretById(idCircuit,arretId).subscribe((data: Arret) => {
        console.log(data)
        this.newArret = data;
        this.existingImageUrl = `${this.baseUrl}/${data.imagePath}`; // Set the existing image URL
        this.audioPath = `${this.baseUrl}/${data.audioPath}`;
        this.specificDestinations = data.specificDestinations.map(item=>{
          let value = item.split(',')

          return {lat : value[0] , lng : value[1]}
        })
        //console.log(data)
        console.log(this.specificDestinations)
        //let {mapContent} = this.newCircuit
        //this.existingImageUrl = `${this.baseUrl}/${data.imagePath}`; // Set the existing image URL
      });
    }
}


// Handle image selection
onImageSelected(event: any) {
  const file = event.target.files[0];
  this.selectedImage = file;
  //console.log(this.selectedImage);
  if (file) {
    // Set the 'existingImageUrl' to the new image URL
    this.existingImageUrl = URL.createObjectURL(file);
  } else {
    // Clear the 'existingImageUrl' if no image is selected
    this.existingImageUrl = null;
  }
}

onSubmit() {
  // Create a new FormData object
  const formData = new FormData();
  // Append form fields to the FormData object
  formData.append('title', this.newArret.title);
  formData.append('description', this.newArret.description);
  formData.append('mapContentLat', this.newArret.mapContent.lat.toString());
  formData.append('mapContentLng', this.newArret.mapContent.lng.toString());
  const circuitId = this.route.snapshot.params['idCircuit'];
  formData.append('idCircuit', circuitId);
console.log(this.specificDestinations)
  for (const value of this.specificDestinations) {
    formData.append('specificDestinations', `${value.lat},${value.lng}`);
  }
  if (this.selectedImage) {
    // Append the selected image file
    formData.append('image', this.selectedImage);
  }

  if(this.audioFile){
    formData.append('audio', this.audioFile);
  }
  
  // Append the audio file to FormData
  // Append the audioFileName as a field
  formData.append('audioFileName', this.audioFileName);


  // // Make an HTTP POST request to your server
  // // Replace 'your-server-url' with the actual server endpoint
  // this.http.post(`${this.baseUrl}/api/arrets`, formData).subscribe(
  //   (response) => {
  //     // Handle success
  //     console.log('Upload successful', response);
  //   },
  //   (error) => {
  //     // Handle error
  //     console.error('Upload failed', error);
  //   }
  // );

  if (this.isEditMode) {
    this.updateArret(formData);
  } else {
    this.createArret(formData);
  }

}


private createArret(formData : any) {
  // //console.log(this.newCircuit)
  // this.arretService.createArret(formData).subscribe(
  //   (response) => {
  //     //console.log(response)
  //     console.log('Circuit created successfully');
  //     this.router.navigate(['/circuits']);
  //     // After creating or updating a circuit successfully
  //     this.snackBar.open('Circuit created successfully', 'Close', {
  //       duration: 3000, // Duration of the notification in milliseconds (3 seconds in this example)
  //       panelClass: ['success-snackbar'], // Custom CSS class for styling
  //   });
  //   },
  //   (error) => {
  //     console.error('Error creating circuit:', error);
  //     // You can display an error message to the user here.
  //   }
  // );
  // Make an HTTP GET request
  this.arretService.createArret(formData).subscribe({
    next: (data) => {
          //console.log(response)
          console.log('Circuit created successfully');
          this.router.navigate(['/circuits']);
          // After creating or updating a circuit successfully
          this.snackBar.open('arret created successfully', 'Close', {
            duration: 3000, // Duration of the notification in milliseconds (3 seconds in this example)
            panelClass: ['success-snackbar'], // Custom CSS class for styling
          });
    },
    error: (error) => {
      // Error callback
    },
    complete: () => {
      // Complete callback
    },
  });
}

private updateArret(formData : any) {
  //console.log(this.newCircuit)

  this.arretService.updateArret(this.newArret._id, formData).subscribe(
    () => {
      //console.log('Circuit updated successfully');
      this.router.navigate(['/circuits']);
      // After creating or updating a circuit successfully
      this.snackBar.open('Circuit updated successfully', 'Close', {
        duration: 3000, // Duration of the notification in milliseconds (3 seconds in this example)
        panelClass: ['success-snackbar'], // Custom CSS class for styling
      });
    },
    (error) => {
      console.error('Error updating circuit:', error);
      // You can display an error message to the user here.
    }
  );
}

addDestination(): void {
  const dialogRef = this.dialog.open(MapPopoverComponent, {
    width: '80%',
    data: {
      latitude: this.mapContentLat,
      longitude: this.mapContentLng,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log(result)
      //.mapContentLat = result.latitude;
      //this.mapContentLng = result.longitude;
      this.specificDestinations.push({lat : result.latitude, lng : result.longitude })
    }
  });
}

addMapContent() : void{

  const dialogRef = this.dialog.open(MapPopoverComponent, {
    width: '80%',
    data: {
      latitude: this.newArret.mapContent.lng,
      longitude: this.newArret.mapContent.lng,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.newArret.mapContent.lat = result.latitude;
      this.newArret.mapContent.lng = result.longitude;
    }
  });
  
}

clearMapContent() : void{
  this.newArret.mapContent = { 
    lat : 0.0,
    lng : 0.0
  } 
}

removeDestination(index : number): void {


  const specificDestinations = this.specificDestinations
  
  const indexToRemove = index; // Index of the object you want to remove
  
  if (indexToRemove >= 0 && indexToRemove < specificDestinations.length) {
    specificDestinations.splice(indexToRemove, 1);
  } else {
    console.error('Invalid index');
  }
  
  this.specificDestinations = [...specificDestinations]

  console.log(this.specificDestinations)
}

}
