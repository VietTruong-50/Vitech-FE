import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from 'src/has-role.guard';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { BannerManagementComponent } from './pages/banner-management/banner-management.component';
import { CruBannerComponent } from './pages/banner-management/cru-banner/cru-banner.component';
import { BrandManagementComponent } from './pages/brand-management/brand-management.component';
import { CruBrandComponent } from './pages/brand-management/cru-brand/cru-brand.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { CruProductComponent } from './pages/product-management/cru-product/cru-product.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { CruSliderComponent } from './pages/slider-management/cru-slider/cru-slider.component';
import { SliderManagementComponent } from './pages/slider-management/slider-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { MasterComponentComponent } from './shared/master-component/master-component.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'admin',
    component: MasterComponentComponent,
    children: [
      {
        path: 'sliders',
        component: SliderManagementComponent,
      },
      {
        path: 'banners',
        component: BannerManagementComponent,
      },
      {
        path: 'sliders/add-slider',
        component: CruSliderComponent,
      },
      {
        path: 'sliders/edit-slider/:id',
        component: CruSliderComponent,
      },

      {
        path: 'banners/add-banner',
        component: CruBannerComponent,
      },
      {
        path: 'banners/edit-banner/:id',
        component: CruBannerComponent,
      },
      {
        path: 'products',
        component: ProductManagementComponent,
      },
      {
        path: 'products/add-product',
        component: CruProductComponent,
      },
      {
        path: 'products/edit-product/:id',
        component: CruProductComponent,
      },
      {
        path: 'categories',
        component: CategoryManagementComponent,
      },
      {
        path: 'users',
        // canActivate: [HasRoleGuard],
        // data: {
        //   role: "ROLE_ADMIN"
        // },
        component: UserManagementComponent,
      },
      {
        path: 'roles',
        // canActivate: [HasRoleGuard],
        // data: {
        //   role: "ROLE_ADMIN"
        // },
        component: RoleManagementComponent,
      },
      {
        path: 'brands',
        component: BrandManagementComponent,
      },
      {
        path: 'brands/add-brand',
        component: CruBrandComponent,
      },
      {
        path: 'brands/edit-brand/:id',
        component: CruBrandComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
