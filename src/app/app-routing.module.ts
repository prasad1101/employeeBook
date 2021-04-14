import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "employee-details", component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
