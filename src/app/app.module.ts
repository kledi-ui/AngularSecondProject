import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataTablesModule } from 'angular-datatables';
import { TableConfigurationComponent } from './components/table-configuration/table-configuration.component';
import { CreateComponent } from './components/pages/create/create.component';
import { UpdateComponent } from './components/pages/update/update.component';
import { DeleteSingleComponent } from './components/modals/delete-single/delete-single.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableConfigurationComponent,
    CreateComponent,
    UpdateComponent,
    DeleteSingleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
