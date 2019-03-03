import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent, ConfirmDialog } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./app.material";
 
//http request
import { HttpClientModule } from "@angular/common/http";
import { SynchronizeComponent } from './components/synchronize/synchronize.component';
import { CustomdatePipe } from './pipes/customdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ConfirmDialog,
    SynchronizeComponent,
    CustomdatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
