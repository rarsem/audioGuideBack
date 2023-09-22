import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitListComponent } from './circuit-list/circuit-list.component'; // Import your Circuit List component here
import { CircuitCreateComponent } from './circuit-create/circuit-create.component';
import { ArretCreateComponent } from './arret-create/arret-create.component';
import { ArretListComponent } from './arret-list/arret-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/circuits', pathMatch: 'full' }, // Redirect to /circuits by default
  { path: 'circuits', component: CircuitListComponent }, // Route to Circuit List component
  // Add more routes as needed
  { path: 'create-circuit', component: CircuitCreateComponent },
  { path: 'edit-circuit/:id', component: CircuitCreateComponent },
  { path: 'create-arret/:idCircuit', component: ArretCreateComponent },
  { path: 'arrets', component: ArretListComponent },
  { path: 'arrets/:idCircuit', component: ArretListComponent },
  { path: 'edit-arret/:idCircuit/:id', component: ArretCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}