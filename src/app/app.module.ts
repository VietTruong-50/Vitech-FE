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
import {MatButtonModule} from '@angular/material/button';
import { ContentHeaderComponent } from './shared/content-header/content-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CruSliderComponent } from './pages/slider-management/cru-slider/cru-slider.component';
import { BannerManagementComponent } from './pages/banner-management/banner-management.component';
import { CruBannerComponent } from './pages/banner-management/cru-banner/cru-banner.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SpinnerLoadingComponent } from './shared/spinner-loading/spinner-loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomepageHeaderComponent } from './shared/homepage-header/homepage-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageFooterComponent } from './shared/homepage-footer/homepage-footer.component';
import { NewsLetterComponent } from './shared/news-letter/news-letter.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CruProductComponent } from './pages/product-management/cru-product/cru-product.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { CruCategoryComponent } from './pages/category-management/cru-category/cru-category.component';
import { HasRoleGuard } from 'src/has-role.guard';
import { AuthService } from 'src/app/service/auth.service';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { BrandManagementComponent } from './pages/brand-management/brand-management.component';
import { CruBrandComponent } from './pages/brand-management/cru-brand/cru-brand.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    MasterComponentComponent,
    SidebarComponentComponent,
    FooterComponentComponent,
    SliderManagementComponent,
    ContentHeaderComponent,
    CruSliderComponent,
    BannerManagementComponent,
    CruBannerComponent,
    ProductManagementComponent,
    SignInComponent,
    SignUpComponent,
    SpinnerLoadingComponent,
    HomepageHeaderComponent,
    HomepageFooterComponent,
    NewsLetterComponent,
    CruProductComponent,
    CategoryManagementComponent,
    CruCategoryComponent,
    UserManagementComponent,
    RoleManagementComponent,
    BrandManagementComponent,
    CruBrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}, HasRoleGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
