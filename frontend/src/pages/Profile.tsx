import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfile {
  name: string;
  email: string;
  role: 'farmer' | 'dealer' | 'deliveryAgent';
  mobile?: string;
  address?: string;
  profileImage?: string;

  // Farmer-specific
  farmDetails?: { crops: string[]; landSize?: string };

  // Dealer-specific
  shopLicenseNumber?: string;
  shopLicenseImage?: string;

  // Delivery Agent-specific
  vehicleType?: string;
  vehicleNumber?: string;
  drivingLicenseImage?: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} userRole={user.role} />
      <main className="container mx-auto px-4 py-8 mt-16">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Profile image */}
              {user.profileImage && (
                <div className="flex justify-center">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                </div>
              )}

              <div>
                <span className="font-semibold">Name:</span> {user.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-semibold">Mobile:</span> {user.mobile || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Address:</span> {user.address || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Role:</span> {user.role}
              </div>

              {/* Farmer-specific info */}
              {user.role === 'farmer' && (
                <div>
                  <span className="font-semibold">Crops:</span>{' '}
                  {user.farmDetails?.crops?.length ? user.farmDetails.crops.join(', ') : 'N/A'}
                  <br />
                  <span className="font-semibold">Land Size:</span> {user.farmDetails?.landSize || 'N/A'}
                </div>
              )}

              {/* Dealer-specific info */}
              {user.role === 'dealer' && (
                <div>
                  <span className="font-semibold">Shop License Number:</span>{' '}
                  {user.shopLicenseNumber || 'N/A'}
                  <br />
                  <span className="font-semibold">Shop License Image:</span>{' '}
                  {user.shopLicenseImage ? (
                    <img
                      src={user.shopLicenseImage}
                      alt="Shop License"
                      className="w-32 h-32 object-cover mt-2 border"
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              )}

              {/* Delivery agent-specific info */}
              {user.role === 'deliveryAgent' && (
                <div>
                  <span className="font-semibold">Vehicle Type:</span> {user.vehicleType || 'N/A'}
                  <br />
                  <span className="font-semibold">Vehicle Number:</span> {user.vehicleNumber || 'N/A'}
                  <br />
                  <span className="font-semibold">Driving License Image:</span>{' '}
                  {user.drivingLicenseImage ? (
                    <img
                      src={user.drivingLicenseImage}
                      alt="Driving License"
                      className="w-32 h-32 object-cover mt-2 border"
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              )}

              <Button
                className="mt-4 w-full"
                variant="outline"
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
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
