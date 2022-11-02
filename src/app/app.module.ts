import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './shared/header-component/header-component.component';
import { MasterComponentComponent } from './shared/master-component/master-component.component';
import { SidebarComponentComponent } from './shared/sidebar-component/sidebar-component.component';
import { FooterComponentComponent } from './shared/footer-component/footer-component.component';
import { SliderManagementComponent } from './pages/slider-management/slider-management.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './shared/api-http-interceptor';
import { AddSliderComponentComponent } from './pages/slider-management/add-slider-component/add-slider-component.component';
import { EditSliderComponentComponent } from './pages/slider-management/edit-slider-component/edit-slider-component.component';
import {MatButtonModule} from '@angular/material/button';
import { ContentHeaderComponent } from './shared/content-header/content-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CruSliderComponent } from './pages/slider-management/cru-slider/cru-slider.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    MasterComponentComponent,
    SidebarComponentComponent,
    FooterComponentComponent,
    SliderManagementComponent,
    AddSliderComponentComponent,
    EditSliderComponentComponent,
    ContentHeaderComponent,
    CruSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
