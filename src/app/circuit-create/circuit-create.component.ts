import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CircuitService } from '../services/circuit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Circuit } from '../model/circuit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MapPopoverComponent } from '../map-popover/map-popover.component';

import {environment}  from "src/environments/environment"

@Component({
  selector: 'app-circuit-create',
  templateUrl: './circuit-create.component.html',
  styleUrls: ['./circuit-create.component.scss']
})
export class CircuitCreateComponent implements OnInit {
  // Crée un nouvel objet Circuit avec une assertion de type
  newCircuit: Circuit = {
    languages: ['Français'],
    mapContent: {} as { lat: number; lng: number }, // Assertion de type
  } as Circuit;


  isEditMode: boolean = false;
  languageOptions: string[] = ['Français', 'Anglais', 'Arabe'];
  selectedImage: File | undefined;
  existingImageUrl: string | null = null; // Initialisez-le à null
  baseUrl = environment.apiUrl;

  readonlyMode: boolean = true;

  constructor(
    private circuitService: CircuitService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog
  ) { }

  /**
   * Navigue vers la page précédente.
   */
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const circuitId = this.route.snapshot.params['id'];
    if (circuitId) {
      // Modification d'un circuit existant
      this.isEditMode = true;
      this.circuitService.getCircuitById(circuitId).subscribe((data: Circuit) => {
        this.newCircuit = data;
        this.existingImageUrl = `${this.baseUrl}/${data.imagePath}`; // Définit l'URL de l'image existante
      });
    }
  }

  /**
   * Ouvre une boîte de dialogue pour ajouter du contenu de carte.
   */
  addMapContent(): void {
    const dialogRef = this.dialog.open(MapPopoverComponent, {
      width: '80%',
      data: {
        latitude: this.newCircuit.mapContent.lng,
        longitude: this.newCircuit.mapContent.lng,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newCircuit.mapContent = {
          lat: result.latitude,
          lng: result.longitude
        };
      }
    });
  }

  /**
   * Efface le contenu de la carte.
   */
  clearMapContent(): void {
    this.newCircuit.mapContent = {
      lat: 0.0,
      lng: 0.0
    };
  }

  /**
   * Gère la sélection de l'image.
   * @param event L'événement de sélection de fichier.
   */
  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;

    if (file) this.existingImageUrl = URL.createObjectURL(file);
    else this.existingImageUrl = null;
  }

  /**
   * Soumet les données du formulaire.
   */
  onSubmit() {
    // En supposant que this.newCircuit.languages est un tableau de chaînes
    const formData = new FormData();

    formData.append('title', this.newCircuit.title);
    formData.append('city', this.newCircuit.city);
    formData.append('country', this.newCircuit.country);
    formData.append('description', this.newCircuit.description);
    formData.append('languages', this.newCircuit.languages.join(','));
    formData.append('mapContentLat', this.newCircuit.mapContent.lat.toString());
    formData.append('mapContentLng', this.newCircuit.mapContent.lng.toString());

    if (this.selectedImage)
      formData.append('image', this.selectedImage, this.selectedImage.name);

    if (this.isEditMode)
      this.updateCircuit(formData);
    else
      this.createCircuit(formData);
  }

  /**
   * Crée un nouveau circuit.
   * @param formData Les données du formulaire pour créer le circuit.
   */
  private createCircuit(formData: any) {
    console.log(this.newCircuit)
    this.circuitService.createCircuit(formData).subscribe(
      () => {
        this.router.navigate(['/circuits']);
        // Après la création ou la mise à jour réussie d'un circuit
        this.snackBar.open('Circuit créé avec succès', 'Fermer', {
          duration: 3000, // Durée de la notification en millisecondes (3 secondes dans cet exemple)
          panelClass: ['success-snackbar'], // Classe CSS personnalisée pour le style
      });
    },
    (error) => 
      {
        console.error('Erreur lors de la création du circuit :', error);
      }
    );
  }

  /**
   * Met à jour un circuit existant.
   * @param formData Les données du formulaire pour mettre à jour le circuit.
   */
  private updateCircuit(formData: any) {
    this.circuitService.updateCircuit(this.newCircuit._id, formData).subscribe(
      () => {
        //console.log('Circuit updated successfully');
        this.router.navigate(['/circuits']);
        // Après la création ou la mise à jour réussie d'un circuit
        this.snackBar.open('Circuit mis à jour avec succès', 'Fermer', {
          duration: 3000, // Durée de la notification en millisecondes (3 secondes dans cet exemple)
          panelClass: ['success-snackbar'], // Classe CSS personnalisée pour le style
        });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du circuit :', error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici.
      }
    );
  }
}