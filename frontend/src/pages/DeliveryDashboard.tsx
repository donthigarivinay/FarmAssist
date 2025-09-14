import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Package, Clock, CheckCircle, Truck, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: "assigned" | "picked_up" | "in_transit" | "delivered";
  assignedDate: string;
  deliveryDate?: string;
  priority: "low" | "medium" | "high";
}

const DeliveryDashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: "1",
      orderId: "ORD001",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      customerAddress: "Village Kharadi, Taluka Maval, District Pune, Maharashtra - 412345",
      products: [
        { name: "Premium Wheat Seeds", quantity: 2, price: 250 },
        { name: "Organic Fertilizer", quantity: 1, price: 450 }
      ],
      totalAmount: 950,
      status: "assigned",
      assignedDate: "2024-01-15",
      priority: "high"
    },
    {
      id: "2",
      orderId: "ORD002",
      customerName: "Sunita Patil",
      customerPhone: "+91 87654 32109",
      customerAddress: "Farm House 23, Shirur Road, Pune, Maharashtra - 411028",
      products: [
        { name: "Pesticide Spray", quantity: 3, price: 300 }
      ],
      totalAmount: 900,
      status: "picked_up",
      assignedDate: "2024-01-14",
      priority: "medium"
    },
    {
      id: "3",
      orderId: "ORD003",
      customerName: "Mahesh Desai",
      customerPhone: "+91 76543 21098",
      customerAddress: "Plot 45, Agriculture Zone, Nashik, Maharashtra - 422001",
      products: [
        { name: "Farming Tools Kit", quantity: 1, price: 1200 }
      ],
      totalAmount: 1200,
      status: "in_transit",
      assignedDate: "2024-01-13",
      priority: "low"
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              deliveryDate: newStatus === "delivered" ? new Date().toISOString().split('T')[0] : order.deliveryDate
            }
          : order
      )
    );

    toast({
      title: "Status Updated",
      description: `Order ${orders.find(o => o.id === orderId)?.orderId} marked as ${newStatus.replace('_', ' ')}`
    });
  };

  const getStatusColor = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "assigned": return "default";
      case "picked_up": return "secondary";
      case "in_transit": return "default";
      case "delivered": return "default";
      default: return "default";
    }
  };

  const getPriorityColor = (priority: DeliveryOrder["priority"]) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getStatusIcon = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "assigned": return <Clock className="w-4 h-4" />;
      case "picked_up": return <Package className="w-4 h-4" />;
      case "in_transit": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingDeliveries: orders.filter(o => o.status !== "delivered").length,
    completedToday: orders.filter(o => o.status === "delivered" && o.deliveryDate === new Date().toISOString().split('T')[0]).length,
    inTransit: orders.filter(o => o.status === "in_transit").length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} userRole="deliveryAgent" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Delivery Dashboard</h1>
          <p className="text-muted-foreground">Manage your delivery assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earth">{stats.pendingDeliveries}</div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.inTransit}</div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.completedToday}</div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Orders</CardTitle>
            <CardDescription>Track and update delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
                          <Badge variant={getPriorityColor(order.priority)}>
                            {order.priority} priority
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>Assigned: {order.assignedDate}</span>
                          {order.deliveryDate && (
                            <span>Delivered: {order.deliveryDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Customer Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Customer Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Name:</strong> {order.customerName}</p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {order.customerPhone}
                          </p>
                          <p className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>{order.customerAddress}</span>
                          </p>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Order Details
                        </h4>
                        <div className="space-y-2">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{product.name} × {product.quantity}</span>
                              <span>₹{(product.price * product.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="border-t pt-2 flex justify-between font-medium">
                            <span>Total Amount:</span>
                            <span>₹{order.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-6 pt-4 border-t">
                      {order.status === "assigned" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "picked_up")}
                        >
                          Mark as Picked Up
                        </Button>
                      )}
                      {order.status === "picked_up" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "in_transit")}
                        >
                          Mark as In Transit
                        </Button>
                      )}
                      {order.status === "in_transit" && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </Badge>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Update Status
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Delivery Status</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Order #{order.orderId} - {order.customerName}
                            </p>
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value as DeliveryOrder["status"])}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="picked_up">Picked Up</SelectItem>
                                <SelectItem value="in_transit">In Transit</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryDashboard;