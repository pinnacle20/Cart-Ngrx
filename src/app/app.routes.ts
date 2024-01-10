import { Routes } from '@angular/router';
import { ProductComponent } from './products/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
];
