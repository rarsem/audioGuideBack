import { Component, OnInit } from '@angular/core';
import { ApiversionService } from '../services/apiversion.service';

@Component({
  selector: 'app-api-version',
  templateUrl: './api-version.component.html',
  styleUrls: ['./api-version.component.scss']
})
export class ApiVersionComponent implements OnInit  {

  version: string = '';
  description: string = '';
  editedVersion: string = '';
  editedDescription: string = '';
  editMode: boolean = false;

  constructor( private versionService: ApiversionService){

  }

  ngOnInit(): void {
    this.getCurrentVersion();
  }

  toggleEditMode(): void {
    this.editedVersion = this.version;
    this.editedDescription = this.description;
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    this.versionService.insertVersion(this.editedVersion, this.editedDescription).subscribe({
      next: (response) => {
        console.log('Version updated successfully:', response);
        this.version = this.editedVersion;
        this.description = this.editedDescription;
        this.editMode = false;
      },
      error: (error) => {
        console.error('Error updating version:', error);
      },
      complete: () => {
        console.log('Update version operation completed.');
      }
    });
  }

  cancelChanges(): void {
    this.editMode = false;
  }

  getCurrentVersion(): void {
    this.versionService.getCurrentVersion().subscribe({
      next: (response) => {
        this.version = response.version;
        this.description = response.description;
      },
      error: (error) => {
        console.error('Error fetching current version:', error);
      },
      complete: () => {
        console.log('Get current version operation completed.');
      }
    });
  }
}
