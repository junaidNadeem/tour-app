import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {CreateTourComponent} from "./create-tour/create-tour.component";

const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'create-tour', component: CreateTourComponent},
  {path: 'create-tour/:id/edit', component: CreateTourComponent},
  {path: 'create-tour/:id/view', component: CreateTourComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
