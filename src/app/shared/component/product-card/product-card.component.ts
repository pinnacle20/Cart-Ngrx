import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../../products/models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() item!: IProduct;
  @Output() handleAdd: EventEmitter<any> = new EventEmitter();

  addToCart(product: IProduct) {
    this.handleAdd.emit(product);
  }
}
