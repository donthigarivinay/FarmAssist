import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, MapPin, Calendar, CreditCard, Truck, Phone, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<any>(location.state || null);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Get current logged-in user email
    const userData = localStorage.getItem('user');
    const email = userData ? JSON.parse(userData).email : '';
    setUserEmail(email);

    // Fallback to last order stored in localStorage
    if (!orderData) {
      const storedOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null');
      if (storedOrder) setOrderData(storedOrder);
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData && userEmail) {
      // Get existing orders
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');

      // Avoid duplicate order
      const exists = existingOrders.some((o: any) => o.orderId === orderData.orderId);
      if (!exists) {
        const newOrder = { ...orderData, customerEmail: userEmail, status: 'Processing' };
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        localStorage.setItem('lastOrder', JSON.stringify(newOrder));
      }
    }
  }, [orderData, userEmail]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} isLoggedIn={true} />
        <main className="container mx-auto px-4 py-8 mt-16 text-center">
          <h1 className="text-2xl font-bold">No Order Found</h1>
          <p className="text-muted-foreground mt-2">It looks like you didn’t place an order.</p>
          <Link to="/shop">
            <Button className="mt-6">Go to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-success animate-scale-in" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We've received your payment and are preparing your items.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6 hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID:</span>
                <Badge variant="outline" className="font-mono">
                  {orderData.orderId}
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Items Ordered:</h4>
                <div className="space-y-2">
                  {orderData.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span>₹{orderData.total?.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    Payment Method: {orderData.paymentMethod}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">
                    Delivery Address: {orderData.deliveryAddress || 'Not Provided'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Order Confirmed', 'Processing', 'Shipped', 'Delivered'].map((status, idx) => (
                  <div key={idx} className={`flex items-center gap-4 ${orderData.status === status ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderData.status === status ? 'bg-success' : 'bg-muted'}`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{status}</p>
                      <p className="text-sm text-muted-foreground">{statusDescriptions(status)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@farmassist.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/order-tracking?orderId=${orderData.orderId}`} className="flex-1">
              <Button className="w-full">Track Your Order</Button>
            </Link>
            <Link to="/shop" className="flex-1">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper to get descriptions
const statusDescriptions = (status: string) => {
  switch (status) {
    case 'Order Confirmed':
      return 'Your order has been received and confirmed';
    case 'Processing':
      return "We're preparing your items for shipment";
    case 'Shipped':
      return 'Your order is on the way';
    case 'Delivered':
      return 'Package delivered successfully';
    default:
      return '';
  }
};

export default OrderConfirmation;
