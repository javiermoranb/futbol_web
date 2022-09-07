import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/web/error/error.component';
import { HeaderComponent } from './components/web/header/header.component';
import { LoadingComponent } from './components/web/loading/loading.component';
import { ValoracionTableComponent } from './components/web/valoracion-table/valoracion-table.component';
import { TrackerFormComponent } from './components/web/tracker-form/tracker-form.component';

import { authInterceptorProviders } from './components/authentication/_helpers/auth.interceptor';
import { LoginComponent } from './components/authentication/login/login.component';
import { NavbarComponent } from './components/web/navbar/navbar.component'
import { SeguimientoComponent } from './components/web/seguimiento/seguimiento.component';
import { RegisterComponent } from './components/authentication/register/register.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel'
import {SliderModule} from 'primeng/slider';
import {StyleClassModule} from 'primeng/styleclass';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import { ValoracionesComponent } from './components/web/valoraciones/valoraciones.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    ValoracionTableComponent, 
    TrackerFormComponent,
    LoadingComponent,
    LoginComponent,
    NavbarComponent,
    SeguimientoComponent,
    RegisterComponent,
    ValoracionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    PanelModule,
    SliderModule,
    StyleClassModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
