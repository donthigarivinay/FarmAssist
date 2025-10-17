import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Package, Truck } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: 'farmer' | 'dealer' | 'deliveryAgent';
  mobile?: string;
  address?: string;
  profileImage?: string;
  farmDetails?: { crops: string[]; landSize?: string };
  shopLicenseNumber?: string;
  shopLicenseImage?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  drivingLicenseImage?: string;
}

interface Order {
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
  deliveryAddress: string;
  paymentMethod: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      const parsedUser = userData ? JSON.parse(userData) : null;
      setUser(
        parsedUser || {
          name: 'Guest',
          email: '',
          role: 'farmer',
        }
      );

      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const currentUserEmail = parsedUser?.email;
      if (currentUserEmail) {
        const userOrders = storedOrders.filter(
          (o: any) => o.customerEmail === currentUserEmail
        );
        setOrders(userOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      setUser({ name: 'Guest', email: '', role: 'farmer' });
      setOrders([]);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <span className="text-green-700 font-semibold">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Header cartItemsCount={0} isLoggedIn={true} userRole={user.role} />

      <main className="container mx-auto px-4 py-8 mt-16 space-y-8">
        {/* Profile Card */}
        <Card className="max-w-3xl mx-auto bg-green-100 shadow-lg border-l-4 border-green-500">
          <CardHeader className="bg-green-200">
            <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
              <User className="w-6 h-6" /> My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-400"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-green-300 flex items-center justify-center text-white font-bold text-xl">
                  {user.name[0]}
                </div>
              )}
            </div>
            <div className="space-y-2 text-green-900">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Mobile:</span> {user.mobile || 'N/A'}</p>
              <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
              <p><span className="font-semibold">Role:</span> {user.role}</p>

              {user.role === 'farmer' && (
                <>
                  <p><span className="font-semibold">Crops:</span> {user.farmDetails?.crops?.join(', ') || 'N/A'}</p>
                  <p><span className="font-semibold">Land Size:</span> {user.farmDetails?.landSize || 'N/A'}</p>
                </>
              )}

              {user.role === 'dealer' && (
                <>
                  <p><span className="font-semibold">Shop License:</span> {user.shopLicenseNumber || 'N/A'}</p>
                  {user.shopLicenseImage && (
                    <img
                      src={user.shopLicenseImage}
                      alt="Shop License"
                      className="w-32 h-32 mt-2 border rounded"
                    />
                  )}
                </>
              )}

              {user.role === 'deliveryAgent' && (
                <>
                  <p><span className="font-semibold">Vehicle Type:</span> {user.vehicleType || 'N/A'}</p>
                  <p><span className="font-semibold">Vehicle Number:</span> {user.vehicleNumber || 'N/A'}</p>
                  {user.drivingLicenseImage && (
                    <img
                      src={user.drivingLicenseImage}
                      alt="Driving License"
                      className="w-32 h-32 mt-2 border rounded"
                    />
                  )}
                </>
              )}

              <Button
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Section */}
        <Card className="max-w-4xl mx-auto bg-green-50 border-l-4 border-green-500 shadow">
          <CardHeader className="bg-green-200">
            <CardTitle className="text-xl text-green-800 flex items-center gap-2">
              <Package className="w-5 h-5" /> Your Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.length === 0 && <p className="text-green-800">No orders found.</p>}
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="p-4 bg-green-100 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md"
              >
                <div className="space-y-1">
                  <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Total:</span> ₹{order.total.toLocaleString()}</p>
                  <p><span className="font-semibold">Status:</span> <Badge>{order.status}</Badge></p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                  {order.status.toLowerCase() !== 'delivered' && (
                    <Link to={`/order-tracking?orderId=${order.orderId}`}>
                      <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
                        Track Order
                      </Button>
                    </Link>
                  )}
                  <Link to={`/order-confirmation`} state={order}>
                    <Button variant="default" size="sm" className="bg-green-600 text-white hover:bg-green-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
