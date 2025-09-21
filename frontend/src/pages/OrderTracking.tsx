import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Calendar,
  User,
  Mail
} from 'lucide-react';

interface TrackingEvent {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
}

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD123456789';

  const orderDetails = {
    orderId,
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    items: [
      { name: 'Premium Wheat Seeds', quantity: 2, price: 250 },
      { name: 'Organic Fertilizer', quantity: 1, price: 450 }
    ],
    total: 950,
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-18',
    deliveryAddress: 'Village Kharadi, Taluka Maval, District Pune, Maharashtra - 412345'
  };

  const trackingEvents: TrackingEvent[] = [
    {
      status: 'Order Confirmed',
      description: 'Your order has been received and confirmed',
      timestamp: '2024-01-15 10:30 AM',
      completed: true
    },
    {
      status: 'Processing',
      description: 'Order is being prepared for shipment',
      timestamp: '2024-01-15 02:45 PM',
      completed: true
    },
    {
      status: 'Packed',
      description: 'Your items have been packed and ready for pickup',
      timestamp: '2024-01-16 09:15 AM',
      location: 'FarmAssist Warehouse, Pune',
      completed: false
    },
    {
      status: 'Shipped',
      description: 'Package has been dispatched for delivery',
      timestamp: '',
      location: 'In Transit to Pune',
      completed: false
    },
    {
      status: 'Out for Delivery',
      description: 'Package is out for delivery',
      timestamp: '',
      location: 'Local Delivery Hub, Pune',
      completed: false
    },
    {
      status: 'Delivered',
      description: 'Package delivered successfully',
      timestamp: '',
      completed: false
    }
  ];

  const completedSteps = trackingEvents.filter(event => event.completed).length;
  const progressPercentage = (completedSteps / trackingEvents.length) * 100;

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    if (status === 'Processing' || status === 'Packed') {
      return <Package className="w-5 h-5 text-primary" />;
    }
    if (status === 'Shipped' || status === 'Out for Delivery') {
      return <Truck className="w-5 h-5 text-primary" />;
    }
    return <Package className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">Monitor your order status and delivery progress</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-medium">{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{orderDetails.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-bold text-lg">₹{orderDetails.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium text-primary">{orderDetails.estimatedDelivery}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{orderDetails.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{orderDetails.customerPhone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{orderDetails.deliveryAddress}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{item.name} × {item.quantity}</span>
                        <span className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tracking Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Delivery Progress
                  </CardTitle>
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completedSteps} of {trackingEvents.length} steps completed
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingEvents.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            event.completed 
                              ? 'bg-success border-success' 
                              : index === completedSteps 
                                ? 'bg-primary border-primary animate-pulse' 
                                : 'bg-background border-muted'
                          }`}>
                            {getStatusIcon(event.status, event.completed)}
                          </div>
                          {index < trackingEvents.length - 1 && (
                            <div className={`w-0.5 h-12 mt-2 ${
                              event.completed ? 'bg-success' : 'bg-muted'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {event.status}
                            </h3>
                            {event.completed && (
                              <Badge variant="default" className="text-xs">
                                Completed
                              </Badge>
                            )}
                            {index === completedSteps && !event.completed && (
                              <Badge variant="secondary" className="text-xs">
                                In Progress
                              </Badge>
                            )}
                          </div>
                          <p className={`text-sm mb-2 ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {event.description}
                          </p>
                          {event.timestamp && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.timestamp}
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Support Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="flex gap-4 mt-6">
                    <Link to="/shop" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button className="w-full">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
