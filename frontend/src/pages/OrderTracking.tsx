import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, Truck, CheckCircle, MapPin, Phone, Calendar, User, Mail } from 'lucide-react';

interface TrackingEvent {
  status: string;
  description: string;
  timestamp?: string;
  location?: string;
  completed: boolean;
}

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD123456789';

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);

  useEffect(() => {
    // Get last order or specific order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find((o: any) => o.orderId === orderId) || JSON.parse(localStorage.getItem('lastOrder') || '{}');
    setOrderDetails(order);

    // Get tracking events from localStorage if available, else default
    const savedTracking = JSON.parse(localStorage.getItem(`tracking_${orderId}`) || 'null');
    if (savedTracking) {
      setTrackingEvents(savedTracking);
    } else {
      const defaultTracking: TrackingEvent[] = [
        { status: 'Order Confirmed', description: 'Your order has been received and confirmed', completed: true, timestamp: order?.date },
        { status: 'Processing', description: 'Order is being prepared for shipment', completed: true, timestamp: order?.date },
        { status: 'Packed', description: 'Your items have been packed and ready for pickup', completed: false, location: 'FarmAssist Warehouse' },
        { status: 'Shipped', description: 'Package has been dispatched for delivery', completed: false, location: 'In Transit' },
        { status: 'Out for Delivery', description: 'Package is out for delivery', completed: false, location: 'Local Delivery Hub' },
        { status: 'Delivered', description: 'Package delivered successfully', completed: false }
      ];
      setTrackingEvents(defaultTracking);
      localStorage.setItem(`tracking_${orderId}`, JSON.stringify(defaultTracking));
    }
  }, [orderId]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Order not found.</p>
      </div>
    );
  }

  const completedSteps = trackingEvents.filter(event => event.completed).length;
  const progressPercentage = (completedSteps / trackingEvents.length) * 100;

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) return <CheckCircle className="w-5 h-5 text-success" />;
    if (status === 'Processing' || status === 'Packed') return <Package className="w-5 h-5 text-primary" />;
    if (status === 'Shipped' || status === 'Out for Delivery') return <Truck className="w-5 h-5 text-primary" />;
    return <Package className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
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
                    <p className="font-medium">{new Date(orderDetails.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-bold text-lg">₹{orderDetails.total?.toLocaleString()}</p>
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
                            <div className={`w-0.5 h-12 mt-2 ${event.completed ? 'bg-success' : 'bg-muted'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {event.status}
                            </h3>
                            {event.completed && (
                              <Badge variant="default" className="text-xs">Completed</Badge>
                            )}
                            {index === completedSteps && !event.completed && (
                              <Badge variant="secondary" className="text-xs">In Progress</Badge>
                            )}
                          </div>
                          <p className={`text-sm mb-2 ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {event.description}
                          </p>
                          {event.timestamp && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.timestamp}</div>
                              {event.location && <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
