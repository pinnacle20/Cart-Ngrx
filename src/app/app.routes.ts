import { Routes } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo:'products', pathMatch:'full'},
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductComponent },
];
