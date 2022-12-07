import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from 'src/has-role.guard';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { BannerManagementComponent } from './pages/banner-management/banner-management.component';
import { CruBannerComponent } from './pages/banner-management/cru-banner/cru-banner.component';
import { BrandManagementComponent } from './pages/brand-management/brand-management.component';
import { CruBrandComponent } from './pages/brand-management/cru-brand/cru-brand.component';
import { BrandUserComponent } from './pages/brand-user/brand-user.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { CruCategoryComponent } from './pages/category-management/cru-category/cru-category.component';
import { CategoryUserComponent } from './pages/category-user/category-user.component';
import { CheckoutCartComponent } from './pages/checkout-cart/checkout-cart.component';
import { ViewCartComponent } from './pages/checkout-cart/view-cart/view-cart.component';
import { HomepageUserComponent } from './pages/homepage-user/homepage-user.component';
import { ProductDetailUserComponent } from './pages/product-detail-user/product-detail-user.component';
import { CruProductComponent } from './pages/product-management/cru-product/cru-product.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { CruSliderComponent } from './pages/slider-management/cru-slider/cru-slider.component';
import { SliderManagementComponent } from './pages/slider-management/slider-management.component';
import { StoreUserComponent } from './pages/store-user/store-user.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { HomepageHeaderComponent } from './shared/homepage-header/homepage-header.component';
import { MasterComponentComponent } from './shared/master-component/master-component.component';
import { MasterUserComponent } from './shared/master-user/master-user.component';
import { UserAccountComponent } from './shared/user-account/user-account.component';

const routes: Routes = [
  {
    path: 'admin',
    component: MasterComponentComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: 'ROLE_ADMIN',
    },
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
        path: 'categories/add-category',
        component: CruCategoryComponent,
      },
      {
        path: 'categories/edit-category/:id',
        component: CruCategoryComponent,
      },
      {
        path: 'users',
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
  {
    path: '',
    component: MasterUserComponent,
    children: [
      {
        path: 'homepage',
        component: HomepageUserComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'store',
        component: StoreUserComponent,
      },
      {
        path: 'product',
        component: ProductDetailUserComponent,
      },
      {
        path: 'checkout',
        component: CheckoutCartComponent,
      },
      {
        path: 'cart',
        component: ViewCartComponent,
      },
      {
        path: 'categories',
        component: CategoryUserComponent,
      },
      {
        path: 'brands',
        component: BrandUserComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
