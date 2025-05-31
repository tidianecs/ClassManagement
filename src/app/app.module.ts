import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { TimetableComponent } from './timetable/timetable.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';
import { StudentSettingComponent } from './student-setting/student-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    StudentSidebarComponent,
    TimetableComponent,
    StudentNotificationsComponent,
    StudentSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
  
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
