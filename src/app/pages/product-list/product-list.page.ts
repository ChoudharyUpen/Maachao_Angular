import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products: any[] = [];
  cart: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  addToCart(product: any) {
    const item = this.cart.find(i => i.id === product.id);
    if (item) {
      item.qty++;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  checkout() {
    if (this.cart.length > 0) {
      this.router.navigate(['/order'], { state: { cart: this.cart } });
    }
  }
}
