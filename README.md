# Frontend Application

This is a simple frontend application made with Angular and Ionic 6. It connects to a backend API to show products and place orders.


## How to Run

First install Ionic CLI:
```
npm install -g @ionic/cli
```

Then install dependencies:
```
npm install
```

Start the app:
```
ionic serve
```

The app will open in your browser at http://localhost:8100


## What's Inside

The project has these main folders:

```
src/app/
  - pages/product-list/  --> shows products and shopping cart
  - pages/order/         --> checkout page
  - services/product.service.ts  --> gets products from backend
  - services/order.service.ts    --> sends orders to backend
```


## Backend API

The app talks to a backend running on http://localhost:5166

**To get products:**
```
GET http://localhost:5166/api/product
```

**To place an order:**
```
POST http://localhost:5166/api/order
Body: {"productId": 1, "quantity": 2}
```

If your backend is on a different URL, change it in:
- src/app/services/product.service.ts (line 10)
- src/app/services/order.service.ts (line 10)


## What It Does

### Products Page
When you open the app, it shows a list of products from the API. You can:
- See all products with their prices
- Click "Add" to add items to cart
- See your cart with total price
- Click "Checkout" to go to order page

### Order Page
On this page you can:
- See what's in your cart
- Click "Place Order" to send order to backend
- Get a success or error message


## Technologies

- Angular 15
- Ionic 6
- TypeScript
- HttpClient for API calls


## Important Files

**product.service.ts** - Gets products from backend
```typescript
getProducts(): Observable<any> {
  return this.http.get('http://localhost:5166/api/product');
}
```

**order.service.ts** - Sends order to backend
```typescript
placeOrder(productId: number, quantity: number): Observable<any> {
  return this.http.post('http://localhost:5166/api/order', 
    { productId, quantity }, 
    { responseType: 'text' }
  );
}
```


## Other Commands

Build for production:
```
npm run build
```

Run on different port:
```
ionic serve --port=8101
```


## Things to Remember

1. Make sure your backend is running on http://localhost:5166 before starting the frontend
2. The backend needs to allow requests from http://localhost:8100 (CORS)
3. The order API returns plain text not JSON, that's why we use responseType: 'text'


## How API Responses Work

**Products API** - Returns a list of products as JSON

**Order API** - Returns "order placed successfully" as plain text

If there's an error, the app will show an alert message.


## Code Style

This project is kept simple on purpose:
- Uses simple TypeScript (no complex types)
- Minimal CSS styling
- Direct API calls
- Simple shopping cart logic
- Uses browser alerts for messages

It's a good starting point if you're learning Angular and Ionic!
