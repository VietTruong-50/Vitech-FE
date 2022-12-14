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
import { MatButtonModule } from '@angular/material/button';
import { ContentHeaderComponent } from './shared/content-header/content-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CruSliderComponent } from './pages/slider-management/cru-slider/cru-slider.component';
import { BannerManagementComponent } from './pages/banner-management/banner-management.component';
import { CruBannerComponent } from './pages/banner-management/cru-banner/cru-banner.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CruProductComponent } from './pages/product-management/cru-product/cru-product.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { CruCategoryComponent } from './pages/category-management/cru-category/cru-category.component';
import { HasRoleGuard } from 'src/has-role.guard';
import { AuthService } from 'src/app/service/auth.service';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { BrandManagementComponent } from './pages/brand-management/brand-management.component';
import { CruBrandComponent } from './pages/brand-management/cru-brand/cru-brand.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HomepageUserComponent } from './pages/homepage-user/homepage-user.component';
import { MasterUserComponent } from './shared/master-user/master-user.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StoreUserComponent } from './pages/store-user/store-user.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductDetailUserComponent } from './pages/product-detail-user/product-detail-user.component';
import { CheckoutCartComponent } from './pages/checkout-cart/checkout-cart.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { ToHtmlPipe } from './pipes/to-html.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbAllModule } from '@syncfusion/ej2-angular-navigations';
import { CategoryUserComponent } from './pages/category-user/category-user.component';
import { BrandUserComponent } from './pages/brand-user/brand-user.component';
import { ViewCartComponent } from './pages/checkout-cart/view-cart/view-cart.component';
import { UserAccountComponent } from './shared/user-account/user-account.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { UserProfileComponent } from './shared/user-account/user-profile/user-profile.component';
import { UserOrderComponent } from './shared/user-account/user-order/user-order.component';
import { WishlistUserComponent } from './pages/wishlist-user/wishlist-user.component';
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
    CruBrandComponent,
    HomepageUserComponent,
    MasterUserComponent,
    StoreUserComponent,
    ProductDetailUserComponent,
    CheckoutCartComponent,
    ToNumberPipe,
    ToHtmlPipe,
    TruncateTextPipe,
    CategoryUserComponent,
    BrandUserComponent,
    ViewCartComponent,
    UserAccountComponent,
    UserProfileComponent,
    UserOrderComponent,
    WishlistUserComponent,
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
    MatIconModule,
    MatGridListModule,
    SlickCarouselModule,
    MatCardModule,
    NgxSliderModule,
    MatTabsModule,
    AngularEditorModule,
    MatTableModule,
    BreadcrumbAllModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    HasRoleGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
