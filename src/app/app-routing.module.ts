import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSliderComponentComponent } from './pages/slider-management/add-slider-component/add-slider-component.component';
import { SliderManagementComponent } from './pages/slider-management/slider-management.component';

const routes: Routes = [
  {
    path: "sliders",
    component: SliderManagementComponent
  },
  {
    path: "add-slider",
    component: AddSliderComponentComponent
  },
  {
    path: "add-slider/:id",
    component: AddSliderComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
