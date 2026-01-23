import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  cart: any[] = [];
  message = '';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.cart = nav.extras.state['cart'] || [];
    }
  }

  ngOnInit() {
    if (this.cart.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  async placeOrder() {
    if (this.cart.length === 0) return;
    
    // Place order for each item in cart
    const firstItem = this.cart[0];
    this.orderService.placeOrder(firstItem.id, firstItem.qty).subscribe({
      next: async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'Success!',
          message: 'Order placed successfully',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/products']);
      },
      error: async (err) => {
        let errorMessage = 'Order failed';
        
        // Handle 400 Bad Request for insufficient stock
        if (err.status === 400) {
          errorMessage = err.error || 'Insufficient stock available for the requested quantity';
        } else {
          errorMessage = err.error?.message || err.message || 'An error occurred while placing the order';
        }
        
        const alert = await this.alertCtrl.create({
          header: 'Order Failed',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
