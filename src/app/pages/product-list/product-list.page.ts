import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  async addToCart(product: any) {
    const item = this.cart.find(i => i.id === product.id);
    const currentQty = item ? item.qty : 0;
    const newQty = currentQty + 1;

    // Check if stock is available
    if (newQty > product.stock) {
      const alert = await this.alertCtrl.create({
        header: 'Insufficient Stock',
        message: `Only ${product.stock} unit(s) available in stock. You already have ${currentQty} in your cart.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

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
