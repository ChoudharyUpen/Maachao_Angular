export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'success' | 'failed';
}
