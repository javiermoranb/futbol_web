import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { SeguimientoComponent } from './components/web/seguimiento/seguimiento.component';
import { ValoracionesComponent } from './components/web/valoraciones/valoraciones.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'valoraciones', component: ValoracionesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
