import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Shield, 
  MapPin,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pin: ''
  });

  const navigate = useNavigate();

  // Get current user
  const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.email || 'guest';
  };
  const getCartKey = () => `cartItems_${getCurrentUser()}`;

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(getCartKey()) || '[]');
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const paymentOptions = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps like GPay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, MasterCard, RuPay cards accepted' },
    { id: 'netbanking', name: 'Net Banking', icon: Shield, description: 'Pay directly from your bank account' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when your order is delivered' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) return alert('Please select a payment method');
    if (cartItems.length === 0) return alert('Your cart is empty');

    setIsProcessing(true);

    const orderId = 'ORD' + Date.now();
    const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pin}`;
    const userEmail = getCurrentUser();

    const orderData = {
      orderId,
      items: cartItems,
      total,
      paymentMethod,
      deliveryAddress,
      date: new Date(),
      customerEmail: userEmail,
      status: 'Processing' // default status
    };

    // Save orders
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    allOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(allOrders));

    // Save last order for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Clear cart
    localStorage.removeItem(getCartKey());
    setCartItems([]);

    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-confirmation', { state: orderData });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} 
        isLoggedIn={true} 
      />

      <main className="pt-16">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">Checkout</h1>
            <p className="text-muted-foreground text-center">Complete your order</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter full name" required />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" className="pl-9" required />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className="pl-9" required />
                      </div>
                    </div>
                    <div>
                      <Label>Complete Address</Label>
                      <Textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="House/Flat no, Street, Area, Landmark" rows={3} required />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" required />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input name="state" value={formData.state} onChange={handleInputChange} placeholder="Enter state" required />
                      </div>
                      <div>
                        <Label>PIN Code</Label>
                        <Input name="pin" value={formData.pin} onChange={handleInputChange} placeholder="Enter PIN code" required />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {paymentOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <option.icon className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">{option.name}</Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground">Your cart is empty.</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item._id} className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Qty: {item.quantity || 1}</span>
                              <span>₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod || isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? 'Processing Order...' : (
                      <>
                        Place Order
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
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

export default Checkout;
