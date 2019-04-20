import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SizingAndPricingComponent } from './sizing-and-pricing/sizing-and-pricing.component';
import { LocationComponent } from './location/location.component';
import { SpecialsComponent } from './specials/specials.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'SizesAndPricing',
    component: SizingAndPricingComponent
  },
  {
    path: 'Location',
    component: LocationComponent
  },
  {
    path: 'Specials',
    component: SpecialsComponent
  },
  {
    path: 'ContactUs',
    component: ContactComponent
  },
  {
    path: '**', redirectTo: '/'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
