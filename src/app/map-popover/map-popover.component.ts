import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Declare the 'H' namespace
declare var H: any;

@Component({
  selector: 'app-map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss']
})
export class MapPopoverComponent {

  private platform: any;
  private map: any = null;

  loading : boolean  = true;

  readonlyMode: boolean = true;

  constructor( public dialogRef: MatDialogRef<MapPopoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
  }

  // Inside your component class
setMarkerLocationAndMapContent(lat: number, lng: number) {
  const marker = new H.map.Marker({ lat, lng });
  this.map.removeObjects(this.map.getObjects()); // Remove previous markers
  this.map.addObject(marker); // Add the new marker
  //this.newArret.mapContent = { lat, lng }; // Update the mapConten
  this.data.latitude = lat;
  this.data.longitude = lng
}
  
  ngOnInit(): void {
    
    this.platform = new H.service.Platform({
      apikey: 'FIv2-2b33Ifx_GBUN9pgRrSqWA5G_LK_KFjTiGEaAUU',
    });
  
    
    const maptypes  = this.platform.createDefaultLayers();
  
    this.map = new H.Map(document.getElementById('mapContainer'), maptypes.vector.normal.map, {
      zoom: 6,
      center: { lat: 31.7917, lng: -7.0926 },
      pixelRatio: window.devicePixelRatio || 1
    });
  
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => this.map.getViewPort().resize());
  
    // Attach an event listener to the map for view changes
    this.map.addEventListener('mapviewchangeend', onMapViewChangeEnd);
  
    // Function to handle the mapviewchangeend event
    function onMapViewChangeEnd() {
      // This function will be called once the map view has finished changing
      // You can consider the map to be fully loaded at this point
      // Set the loading indicator to false
      console.log('isLoaded')
      self.loading = false; // Assuming 'loading' is a boolean variable controlling the indicator
    }
  
    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
  
    // Create the default UI components
    var ui = H.ui.UI.createDefault(this.map, this.platform.createDefaultLayers());
  
  
  
  // ...
  
  let self = this;
  let previousMarker : any = null;
  this.map.addEventListener('tap', function (e: any) {
  var coord = self.map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
  var lat = coord.lat;
  var lng = coord.lng;
  
  // Clear the previous marker if it exists
  if (previousMarker) {
    self.map.removeObject(previousMarker);
  }
  
  // Assign lat and lng values to mapContent
  self.data.latitude = lat;
  self.data.longitude= lng;
  
  // Add a marker to the clicked location
  var marker = new H.map.Marker(coord);
  self.map.addObject(marker);
  
   // Update the reference to the new marker
   previousMarker = marker;
  });
  
  
  
  }

  onSave(): void {
    // When the user clicks "Save" in the map popover, close the dialog and pass the updated data
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    // When the user clicks "Cancel," close the dialog without making any changes
    this.dialogRef.close();
  }

  
}
