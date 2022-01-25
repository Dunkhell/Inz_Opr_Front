import { AuthHeaderInterceptor } from './auth/auth-header.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { LoginDemoComponent } from './components/LoginDemo/LoginDemo.component';
import { LoggedComponent } from './components/logged/logged.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccinationDatesComponent } from './components/vaccination-dates/vaccination-dates.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { VisitsComponent } from './components/visits/visits.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { Page403Component } from './components/page403/page403.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogAddFacilityComponent } from './components/facilities/dialog-add-facility/dialog-add-facility.component';
import { CommonModule } from '@angular/common';
import { DialogEditFacilityComponent } from './components/facilities/dialog-edit-facility/dialog-edit-facility.component';
import { DialogDeleteFacilityComponent } from './components/facilities/dialog-delete-facility/dialog-delete-facility.component';
import { DialogEditUserComponent } from './components/users/dialog-edit-user/dialog-edit-user.component';
import { DialogAddVaccineComponent } from './components/vaccines/dialog-add-vaccine/dialog-add-vaccine.component';
import { DialogEditVaccineComponent } from './components/vaccines/dialog-edit-vaccine/dialog-edit-vaccine.component';
import { DialogDeleteVaccineComponent } from './components/vaccines/dialog-delete-vaccine/dialog-delete-vaccine.component';
import { DialogAddVisitComponent } from './components/visits/dialog-add-visit/dialog-add-visit.component';
import { DialogEditVisitComponent } from './components/visits/dialog-edit-visit/dialog-edit-visit.component';
import { DialogDeleteVisitComponent } from './components/visits/dialog-delete-visit/dialog-delete-visit.component';
import { DialogAddManyVisitsComponent } from './components/visits/dialog-add-many-visits/dialog-add-many-visits.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './components/header/header.component';
import { AdminPanelSiteComponent } from './components/admin-panel-site/admin-panel-site.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginDemoComponent,
    LoggedComponent,
    UsersComponent,
    VaccinationDatesComponent,
    AdminPanelComponent,
    VisitsComponent,
    VaccinesComponent,
    FacilitiesComponent,
    Page403Component,
    DialogAddFacilityComponent,
    DialogEditFacilityComponent,
    DialogDeleteFacilityComponent,
    DialogEditUserComponent,
    DialogAddVaccineComponent,
    DialogEditVaccineComponent,
    DialogDeleteVaccineComponent,
    DialogAddVisitComponent,
    DialogEditVisitComponent,
    DialogDeleteVisitComponent,
    DialogAddManyVisitsComponent,
    HeaderComponent,
    AdminPanelSiteComponent,
    FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '615859748148-uncsb6e0j23okfql5nagjtt65houtev0.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
