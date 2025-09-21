import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Leaf, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState('farmer');
  const [isLoading, setIsLoading] = useState(false);

  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dealer Fields
  const [shopNumber, setShopNumber] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  // Delivery Agent Fields
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleLicense, setVehicleLicense] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          mobile: phone,
          address,
          password,
          role: userRole,
          // Dealer-specific
          shopNumber: userRole === 'dealer' ? shopNumber : undefined,
          licenseId: userRole === 'dealer' ? licenseId : undefined,
          shopAddress: userRole === 'dealer' ? shopAddress : undefined,
          // Delivery Agent-specific
          vehicleNumber: userRole === 'deliveryAgent' ? vehicleNumber : undefined,
          vehicleLicense: userRole === 'deliveryAgent' ? vehicleLicense : undefined,
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      setIsLoading(false);
      alert('Network error');
    }
  };

  const roleInfo = {
    farmer: {
      icon: '👨‍🌾',
      title: 'Farmer Account',
      description: 'Buy agricultural products, track orders, and get farming tips'
    },
    dealer: {
      icon: '🧑‍💼',
      title: 'Dealer Account',
      description: 'Sell products, manage inventory, and track sales analytics'
    },
    deliveryAgent: {
      icon: '🚚',
      title: 'Delivery Agent',
      description: 'Handle deliveries, update order status, and manage routes'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary font-bold text-2xl">
            <Leaf className="h-8 w-8" />
            <span className="text-gradient">FarmAssist</span>
          </Link>
          <p className="text-muted-foreground mt-2">Join our farming community today</p>
        </div>

        <Card className="hover-lift">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <p className="text-muted-foreground">Fill in your details to get started</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              
              {/* Role Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">Account Type *</label>
                <Select value={userRole} onValueChange={setUserRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">👨‍🌾 Farmer</SelectItem>
                    <SelectItem value="dealer">🧑‍💼 Dealer</SelectItem>
                    <SelectItem value="deliveryAgent">🚚 Delivery Agent</SelectItem>
                  </SelectContent>
                </Select>
                {userRole && roleInfo[userRole as keyof typeof roleInfo] && (
                  <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{roleInfo[userRole as keyof typeof roleInfo].icon}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{roleInfo[userRole as keyof typeof roleInfo].title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {roleInfo[userRole as keyof typeof roleInfo].description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name *</label>
                  <Input placeholder="Enter first name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name *</label>
                  <Input placeholder="Enter last name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" placeholder="Enter email address" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                  <Input type="tel" placeholder="Enter phone number" required value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium mb-2 block">Address *</label>
                <Textarea placeholder="Enter your complete address" rows={3} required value={address} onChange={e => setAddress(e.target.value)} />
              </div>

              {/* Dealer Fields */}
              {userRole === 'dealer' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Shop Number *</label>
                    <Input placeholder="Enter shop number" required value={shopNumber} onChange={e => setShopNumber(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">License ID *</label>
                    <Input placeholder="Enter license ID" required value={licenseId} onChange={e => setLicenseId(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Shop Address *</label>
                    <Textarea placeholder="Enter shop address" rows={2} required value={shopAddress} onChange={e => setShopAddress(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Delivery Agent Fields */}
              {userRole === 'deliveryAgent' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vehicle Number *</label>
                    <Input placeholder="Enter vehicle number" required value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vehicle License *</label>
                    <Input placeholder="Enter vehicle license" required value={vehicleLicense} onChange={e => setVehicleLicense(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Password *</label>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Create password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm Password *</label>
                  <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 rounded" required />
                <p className="text-sm text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
