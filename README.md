# MaaChao Angular

Angular + Ionic 6 app for browsing products and placing orders.

## Setup

Install dependencies:
```bash
npm install -g @ionic/cli
npm install
```

Run the app:
```bash
npm run start
```

App will open at http://localhost:4200

## Project Structure

```
src/app/
├── models/
│   └── product.model.ts
├── pages/
│   ├── product-list/
│   │   ├── product-list.page.ts
│   │   ├── product-list.page.html
│   │   └── product-list.module.ts
│   └── order/
│       ├── order.page.ts
│       ├── order.page.html
│       └── order.module.ts
├── services/
│   ├── product.service.ts
│   └── order.service.ts
├── app-routing.module.ts
└── app.module.ts
```

## API Endpoints

Backend runs at: http://localhost:5166

Get all products:
```
GET /api/product
```

Place an order:
```
POST /api/order
Body: { "productId": number, "quantity": number }
```

## How It Works

Product List Page:
- Shows all products from the backend
- Add products to cart
- View total price
- Navigate to order page with cart

Order Page:
- Displays cart items
- Submit order to backend
- Shows success/error message
- Returns to product list

## Important Notes

- Make sure backend is running before starting the app
- Backend must allow CORS from http://localhost:4200
- Cart data is stored in memory only (resets on page refresh)
- Currently only processes first item in cart when placing order

## Tech Stack

- Angular 15
- Ionic 6
- TypeScript
- RxJS
- HttpClient
