import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitListComponent } from './circuit-list/circuit-list.component'; // Import your Circuit List component here
import { CircuitCreateComponent } from './circuit-create/circuit-create.component';
import { ArretCreateComponent } from './arret-create/arret-create.component';
import { ArretListComponent } from './arret-list/arret-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard' ; // Update the path as needed
import { SignupComponent } from './signup/signup.component';
import { ListAutorizedComponent } from './list-autorized/list-autorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to /circuits by default
  { path: 'login', component: LoginComponent },
  { path: 'circuits', component: CircuitListComponent, canActivate: [AuthGuard]},
  // Add more routes as needed
  { path: 'create-circuit', component: CircuitCreateComponent },
  { path: 'edit-circuit/:id', component: CircuitCreateComponent },
  { path: 'create-arret/:idCircuit', component: ArretCreateComponent },
  { path: 'arrets', component: ArretListComponent },
  { path: 'arrets/:idCircuit', component: ArretListComponent },
  { path: 'edit-arret/:idCircuit/:id', component: ArretCreateComponent },
  {path  : 'signup' , component :  SignupComponent,},
  {path  : 'list-authorized' , component :  ListAutorizedComponent,}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule {}