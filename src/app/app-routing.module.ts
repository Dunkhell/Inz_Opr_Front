import { Page403Component } from './components/page403/page403.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { VaccinationDatesComponent } from './components/vaccination-dates/vaccination-dates.component';
import { UsersComponent } from './components/users/users.component';
import { LoggedComponent } from './components/logged/logged.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDemoComponent } from './components/LoginDemo/LoginDemo.component';
import { VisitsComponent } from './components/visits/visits.component';
import { AdminPanelSiteComponent } from './components/admin-panel-site/admin-panel-site.component';

const routes: Routes = [
  {path: 'login', component: LoginDemoComponent},
  {path: 'logged', component: LoggedComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'vaccination-dates', component: VaccinationDatesComponent, canActivate: [AuthGuard]},
  {path: 'adminpanel', component: AdminPanelSiteComponent, canActivate: [AuthGuard]},
  {path: 'visits', component: VisitsComponent, canActivate: [AuthGuard]},
  {path: 'vaccines', component: VaccinesComponent, canActivate: [AuthGuard]},
  {path: 'facilities', component: FacilitiesComponent, canActivate: [AuthGuard]},
  {path: '403', component: Page403Component},
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: '**',   redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
